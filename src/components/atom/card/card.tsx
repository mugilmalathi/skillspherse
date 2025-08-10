
import React from "react";

export default function Card({ className = "", children }: { className?: string; children: React.ReactNode; }){
  return <div className={`bg-slate-900/70 border border-white/10 rounded-2xl ${className}`}>{children}</div>;
}
