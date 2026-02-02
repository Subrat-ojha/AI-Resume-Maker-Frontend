import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Crown, Sparkles } from 'lucide-react';
import { createOrder, verifyPayment, VerifyPaymentResponse } from '../api/paymentService';
import { useAuth } from '../contexts/AuthContext';

// Extend Window interface for Razorpay
declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    modal?: {
        ondismiss?: () => void;
    };
    prefill?: {
        name?: string;
        email?: string;
    };
    theme?: {
        color?: string;
    };
}

interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface RazorpayInstance {
    open: () => void;
}

interface UpgradeButtonProps {
    onSuccess?: (data: VerifyPaymentResponse) => void;
    variant?: 'default' | 'compact';
    className?: string;
}

const UpgradeButton = ({ onSuccess, variant = 'default', className = '' }: UpgradeButtonProps) => {
    const [loading, setLoading] = useState(false);
    const { user, refreshProfile } = useAuth();

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }

        setLoading(true);

        try {
            // Ensure Razorpay SDK is loaded
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                alert('Failed to load payment SDK. Please check your internet connection.');
                setLoading(false);
                return;
            }

            // Step 1: Create order from backend
            const orderData = await createOrder();

            if (orderData.status !== 'SUCCESS') {
                throw new Error(orderData.message || 'Failed to create order');
            }

            // Step 2: Open Razorpay Checkout
            const options: RazorpayOptions = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'AI Resume Builder',
                description: orderData.description || 'Premium Subscription',
                order_id: orderData.orderId,

                // Step 3: Handle payment success
                handler: async function (response: RazorpayResponse) {
                    try {
                        const verifyData = await verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });

                        if (verifyData.status === 'SUCCESS') {
                            await refreshProfile();
                            onSuccess?.(verifyData);
                        } else {
                            alert('Payment verification failed: ' + verifyData.message);
                        }
                    } catch (error) {
                        console.error('Verification error:', error);
                        alert('Error verifying payment.');
                    }
                    setLoading(false);
                },

                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                },

                prefill: {
                    name: user.name || '',
                    email: user.email || ''
                },

                theme: {
                    color: '#10B981'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error: any) {
            console.error('Payment error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            alert(`Payment Error: ${errorMessage}`);
            setLoading(false);
        }
    };

    if (variant === 'compact') {
        return (
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                disabled={loading}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-[#00ff88] text-white font-medium text-sm shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Crown className="w-4 h-4" />
                )}
                {loading ? 'Processing...' : 'Choose Pro'}
            </motion.button>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={loading}
            className={`relative group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-[#00ff88] text-white font-mono uppercase tracking-wider text-sm shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${className}`}
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

            <span className="relative flex items-center gap-3">
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Sparkles className="w-5 h-5" />
                )}
                {loading ? 'Processing...' : 'Upgrade to Premium — ₹499/month'}
            </span>
        </motion.button>
    );
};

export default UpgradeButton;
