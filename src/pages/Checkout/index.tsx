import React from "react";
import Button from "../../components/atom/button/button";
import { AuthManager } from "../../utils/auth";
import type { Course } from "../../types/course";
import { CreditCard, User, Mail, MapPin, Phone } from "lucide-react";

export default function Checkout({
                                     course,
                                     onSuccess,
                                 }: {
    course: Course;
    onSuccess: () => void;
}) {
    const user = AuthManager.getUser();
    
    if (!user) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="text-center">
                    <p className="text-red-400">Please login to continue with checkout</p>
                </div>
            </div>
        );
    }

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <Button
                className="text-sm text-slate-400 hover:text-slate-200"
                onClick={() => history.back()}
            >
                &larr; Back to Course
            </Button>

            <h1 className="text-3xl font-bold mt-4">Checkout</h1>

            <div className="mt-6 grid lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Course Details */}
                    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                        <div className="flex gap-4">
                            <img
                                src={course.thumbnail || "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=200"}
                                alt={course.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium text-lg">{course.title}</h3>
                                <p className="text-sm text-slate-400 mb-2">By {course.instructor}</p>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">
                                        {course.level}
                                    </span>
                                    <span>• {formatDuration(course.duration)}</span>
                                    <span>• {course.curriculum.length} lessons</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-semibold">
                                    ${course.price.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg">
                                <User className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm text-slate-400">Full Name</p>
                                    <p className="text-white">{user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg">
                                <Mail className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm text-slate-400">Email Address</p>
                                    <p className="text-white">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 sticky top-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Course Price</span>
                                <span className="text-white">${course.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Tax</span>
                                <span className="text-white">$0.00</span>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${course.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-medium mb-3">Payment Method</h3>
                            <div className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg border border-white/10">
                                <CreditCard className="h-5 w-5 text-slate-400" />
                                <span className="text-white">Credit / Debit Card</span>
                            </div>
                        </div>

                        <Button
                            onClick={onSuccess}
                            variant="secondary"
                            className="w-full text-lg py-3"
                        >
                            Pay ${course.price.toFixed(2)}
                        </Button>

                        <p className="text-xs text-slate-500 mt-4 text-center">
                            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
