import React from "react";
import { apiClient } from "../../utils/api";

type Role = "Student" | "IT Professional" | "Professor" | "Freelancer";
const ROLES: Role[] = ["Student", "IT Professional", "Professor", "Freelancer"];

export default function Registration({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState<Role | "">("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [ok, setOk] = React.useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setOk(null);

        if (!name.trim() || !email.trim() || !password || !role) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            const response = await apiClient.register({
                name: name.trim(),
                email: email.trim(),
                password,
                role: "student", // Map role as needed
            });

            if (response.success) {
                setOk("Account created! You can now sign in.");
                setName("");
                setEmail("");
                setPassword("");
                setRole("");
            } else {
                setError(response.message || "Registration failed");
            }
        } catch (err: any) {
            setError(err?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] grid place-items-center px-4">
            <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <h1 className="text-[34px] md:text-5xl font-bold leading-tight text-slate-100">
                    Create your<br />account
                </h1>

                <form onSubmit={submit} className="mt-8 grid gap-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="reg_name" className="block text-sm text-slate-300">Full name</label>
                        <input
                            id="reg_name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            autoComplete="name"
                            className="mt-2 w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="reg_email" className="block text-sm text-slate-300">Email address</label>
                        <input
                            id="reg_email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="mt-2 w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="reg_password" className="block text-sm text-slate-300">Password</label>
                        <input
                            id="reg_password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className="mt-2 w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                        />
                        <p className="mt-1 text-xs text-slate-500">Use at least 6 characters.</p>
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="reg_role" className="block text-sm text-slate-300">Role</label>
                        <select
                            id="reg_role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as Role)}
                            className="mt-2 w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                        >
                            <option value="" disabled>Select a role</option>
                            {ROLES.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* Alerts */}
                    {error && <div className="text-sm text-red-400">{error}</div>}
                    {ok && <div className="text-sm text-emerald-400">{ok}</div>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-xl px-4 py-3 bg-white text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 transition-colors"
                    >
                        {loading ? "Creating..." : "Create account"}
                    </button>

                    <p className="text-sm text-slate-400 pt-1">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={onNavigateToLogin}
                            className="text-slate-200 hover:text-white underline"
                        >
                            Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
