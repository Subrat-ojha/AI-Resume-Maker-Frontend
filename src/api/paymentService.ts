import api from './api';

// Types for payment responses
export interface CreateOrderResponse {
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    planName: string;
    description: string;
    status: 'SUCCESS' | 'FAILED';
    message?: string;
}

export interface VerifyPaymentRequest {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export interface VerifyPaymentResponse {
    status: 'SUCCESS' | 'FAILED';
    message: string;
    subscriptionPlan?: string;
    subscriptionExpiry?: string;
}

export interface SubscriptionStatus {
    status: string;
    message: string;
    subscriptionPlan: string | null;
    subscriptionExpiry?: string;
}

// Create Razorpay Order
export const createOrder = async (): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>('/api/payments/create-order', {});
    return response.data;
};

// Verify Payment after Razorpay checkout
export const verifyPayment = async (paymentData: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
    const response = await api.post<VerifyPaymentResponse>('/api/payments/verify', paymentData);
    return response.data;
};

// Get current subscription status
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
    const response = await api.get<SubscriptionStatus>('/api/payments/status');
    return response.data;
};
