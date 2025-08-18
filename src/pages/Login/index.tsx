import React from "react";
import Button from "../../components/atom/button/button";
import { apiClient } from "../../utils/api";
import { AuthManager } from "../../utils/auth";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      console.log('Attempting login with:', { email: email.trim(), password: '***' });
      
      const response = await apiClient.login({
        email: email.trim(),
        password,
      });

      console.log('Login response:', response);

      if (response.success && response.data) {
        AuthManager.saveAuth(response.data);
        onLogin();
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-6">
        <h1 className="text-2xl font-semibold">Sign in to your account</h1>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <div>
            <label htmlFor="email" className="text-sm text-slate-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white placeholder:text-slate-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white placeholder:text-slate-500"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="secondary"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}