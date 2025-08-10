import React from "react";

type Role = "Student" | "IT Professional" | "Professor" | "Freelancer";
const ROLES: Role[] = ["Student", "IT Professional", "Professor", "Freelancer"];

export default function Registration() {
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
            const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3007";
            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password,
                    // map your dropdown label to backend value if needed:
                    role: "student", // or map: role.toLowerCase().replace(" ", "_")
                }),
            });
            if (!res.ok) throw new Error(await res.text());
            setOk("Account created! You can now sign in.");
            setName(""); setEmail(""); setPassword(""); setRole("");
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
                        className="mt-2 w-full rounded-xl px-4 py-3 text-slate-50 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create account"}
                    </button>

                    <p className="text-sm text-slate-400 pt-1">
                        Already have an account? <span className="text-slate-200">Sign in</span>
                    </p>
                </form>
            </div>
        </div>
    );
}
