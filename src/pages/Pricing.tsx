import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Crown, Sparkles, Zap } from 'lucide-react';
import { PaymentSuccessModal } from '../components/ui/PaymentSuccessModal';

const Pricing = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handlePaymentSuccess = (data: VerifyPaymentResponse) => {
        setShowSuccessModal(true);
    };

    const isPremium = user?.subscriptionPlan === 'premium' || user?.subscriptionPlan === 'PREMIUM';

    // Calculate prices based on billing cycle
    const prices = {
        free: { monthly: 0, yearly: 0 },
        pro: { monthly: 499, yearly: 399 },
        enterprise: { monthly: 1499, yearly: 1249 }
    };

    const currentPrices = {
        free: prices.free[billingCycle],
        pro: prices.pro[billingCycle],
        enterprise: prices.enterprise[billingCycle]
    };

    const plans = [
        {
            id: 'free',
            name: 'Free',
            badge: 'Starter',
            badgeColor: 'bg-emerald-500',
            price: currentPrices.free,
            description: 'Perfect for trying out our AI resume builder.',
            features: [
                '5 Resume Optimizations/day',
                'Basic AI Suggestions',
                'Standard Templates',
                'PDF Export'
            ],
            cta: 'Get Started Free',
            popular: false
        },
        {
            id: 'pro',
            name: 'Pro',
            badge: 'Pro',
            badgeColor: 'bg-emerald-500',
            price: currentPrices.pro,
            description: 'Best for active job seekers with more needs.',
            features: [
                'Unlimited Optimizations',
                'Advanced AI Suggestions',
                'All Premium Templates',
                '24/7 Priority Support'
            ],
            cta: 'Choose Pro',
            popular: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            badge: 'Enterprise',
            badgeColor: 'bg-purple-500',
            price: currentPrices.enterprise,
            description: 'Ideal for teams and recruiters who need scalability.',
            features: [
                'Everything in Pro',
                'Team Collaboration',
                'API Access',
                'Custom Integrations'
            ],
            cta: 'Contact Sales',
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="text-emerald-400 font-medium text-sm tracking-wide uppercase">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                        Select the plan that best suits your needs.
                    </h1>
                </motion.div>

                {/* Billing Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex items-center bg-[#1a1a1a] rounded-full p-1">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${billingCycle === 'monthly'
                                ? 'bg-white text-black'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${billingCycle === 'yearly'
                                ? 'bg-white text-black'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Yearly
                            <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className={`relative rounded-2xl p-8 ${plan.popular
                                ? 'bg-[#1a1a1a] border-2 border-emerald-500/50'
                                : 'bg-[#111111] border border-gray-800'
                                }`}
                        >
                            {/* Badge */}
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <span className={`${plan.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                                    {plan.badge}
                                </span>
                                {plan.popular && (
                                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium border border-emerald-500/30">
                                        Most popular
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className="text-center mb-4">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl md:text-5xl font-bold text-white">
                                        ₹{plan.price}
                                    </span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm text-center mb-8 min-h-[40px]">
                                {plan.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-emerald-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            {plan.id === 'free' ? (
                                <button
                                    onClick={() => navigate('/create')}
                                    className="w-full py-3.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors"
                                >
                                    {plan.cta}
                                </button>
                            ) : plan.id === 'pro' ? (
                                isPremium ? (
                                    <div className="w-full py-3.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-semibold text-sm text-center border border-emerald-500/30">
                                        <Crown className="w-4 h-4 inline mr-2" />
                                        Current Plan
                                    </div>
                                ) : (
                                    <UpgradeButton
                                        onSuccess={handlePaymentSuccess}
                                        variant="compact"
                                        className="w-full !px-0 !py-3.5 !rounded-lg !bg-emerald-500 hover:!bg-emerald-600 !text-white !font-semibold !text-sm !shadow-none"
                                    />
                                )
                            ) : (
                                <button
                                    onClick={() => window.location.href = 'mailto:support@resumexpert.com'}
                                    className="w-full py-3.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors"
                                >
                                    {plan.cta}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex flex-wrap justify-center items-center gap-8 mt-16 text-gray-500 text-sm"
                >
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>7-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-emerald-400" />
                        <span>Secure payment via Razorpay</span>
                    </div>
                </motion.div>
            </div>

            <PaymentSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div >
    );
};

export default Pricing;
