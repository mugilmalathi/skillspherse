import Button from "../../components/atom/button/button";


export default function Login({ onLogin }:{ onLogin: ()=>void }){
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-6">
        <h1 className="text-2xl font-semibold">Sign in to your account</h1>
        <div className="mt-4 grid gap-4">
          <div>
            <label className="text-sm text-slate-300">Email address</label>
            <input className="mt-1 w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input type="password" className="mt-1 w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2" placeholder="••••••••" />
          </div>
          <Button onClick={onLogin} className="rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500">Sign in</Button>
        </div>
      </div>
    </div>
  );
}
