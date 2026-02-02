import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PaymentSuccessModal = ({ isOpen, onClose }: PaymentSuccessModalProps) => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed z-50 w-full max-w-md bg-[#1a1a1a] border border-emerald-500/20 rounded-2xl p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Glow effects */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Success Icon */}
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative group">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl" />
                                <Check className="w-10 h-10 text-emerald-400 relative z-10" />
                                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">
                                Payment Successful!
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Welcome to Premium. You now have unlimited access to all AI features and templates.
                            </p>

                            <div className="flex flex-col w-full gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all"
                                >
                                    Go to Dashboard
                                </motion.button>

                                <button
                                    onClick={onClose}
                                    className="w-full py-3.5 rounded-xl bg-gray-800 text-gray-300 font-medium hover:bg-gray-700 transition-colors"
                                >
                                    Stay Here
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
