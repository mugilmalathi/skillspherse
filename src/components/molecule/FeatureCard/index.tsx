
import React from "react";
import Card from "../../atom/card/Card";

export default function FeatureCard({ icon, title, text }:{ icon: React.ReactNode; title: string; text: string; }){
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-inner">
          {icon}
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <p className="mt-2 text-slate-300">{text}</p>
    </Card>
  );
}
