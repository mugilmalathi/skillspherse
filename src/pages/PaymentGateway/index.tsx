import React from "react";
import Button from "../../components/atom/button/button";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

export default function PaymentGateway({ 
    amount, 
    onSuccess 
}: { 
    amount: number; 
    onSuccess: () => void; 
}) {
    const [cardNumber, setCardNumber] = React.useState("");
    const [expiryDate, setExpiryDate] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [cardName, setCardName] = React.useState("");
    const [processing, setProcessing] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            alert("Please fill in all fields");
            return;
        }

        setProcessing(true);
        
        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            setShowSuccess(true);
            
            // Show success animation for 3 seconds then redirect
            setTimeout(() => {
                onSuccess();
            }, 3000);
        }, 2000);
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="mb-6">
                        <CheckCircle className="h-24 w-24 text-green-400 mx-auto animate-bounce" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
                    <p className="text-slate-300 mb-6">
                        Your payment of ${amount.toFixed(2)} has been processed successfully.
                    </p>
                    <div className="text-slate-400">
                        Redirecting to homepage...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Lock className="h-5 w-5 text-green-400" />
                            <span className="text-green-400 text-sm">Secure Payment</span>
                        </div>
                        <h1 className="text-2xl font-bold">Payment Gateway</h1>
                        <p className="text-slate-400 mt-2">
                            Complete your payment of ${amount.toFixed(2)}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Card Number
                            </label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                Cardholder Name
                            </label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                    placeholder="123"
                                    maxLength={3}
                                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={processing}
                            className="w-full text-lg py-3 mt-6"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </span>
                            ) : (
                                `Pay $${amount.toFixed(2)}`
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-500">
                            Your payment information is secure and encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}