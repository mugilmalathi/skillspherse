import Button from "../../components/atom/button/button";
import { COURSES } from "../../data";

export default function Courses({ onView }: { onView: (id:number)=>void }){
  return (
    <div className="mx-auto max-w-7xl px-4 py-12"> 
      <h1 className="text-3xl font-bold">Courses</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3"> 
        {COURSES.map(c => (
          <div key={c.id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">{c.level}</span>
              <span className="text-slate-400">• {c.duration}</span>
            </div>
            <h3 className="mt-2 font-semibold">{c.title}</h3>
            <div className="mt-4 flex items-center justify-between">
              <Button onClick={()=>onView(c.id)} className="rounded-xl px-3 py-2 bg-white text-black border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500 before:rounded-xl before:-z-10 before:m-[-2px]">View Details →</Button>
              <div className="text-slate-200 font-semibold">${'{'}c.price.toFixed(2){'}'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
