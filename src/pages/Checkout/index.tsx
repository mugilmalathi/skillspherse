import Button from "../../components/atom/button/button";
import { COURSES } from "../../data";
import { CreditCard } from "lucide-react";

export default function Checkout({
                                     id,
                                     onSuccess,
                                 }: {
    id: number;
    onSuccess: () => void;
}) {
    const c = COURSES.find((x) => x.id === id);
    if (!c) return <div className="p-10">Course not found.</div>;

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <Button
                className="text-sm text-slate-400 hover:text-slate-200"
                onClick={() => history.back()}
            >
                &larr; Back to Course
            </Button>

            <h1 className="text-3xl font-bold mt-4">Checkout</h1>

            <div className="mt-6 bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-slate-400">
                    {c.level} • {c.duration}
                </div>
                <div className="mt-2 text-xl font-semibold">
                    ${c.price.toFixed(2)}
                </div>
            </div>

            <div className="mt-6 bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                <div className="font-medium mb-2">Payment Method</div>
                <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" /> Credit / Debit Card
                </div>
                <Button
                    onClick={onSuccess}
                    variant="primary"
                    className="mt-6"
                >
                    Pay ${c.price.toFixed(2)}
                </Button>
            </div>
        </div>
    );
}
