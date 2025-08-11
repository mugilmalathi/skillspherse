import Button from "../../components/atom/button/button";

import { COURSES } from "../../data";

export default function MyCourses({ owned }:{owned:number[]}){
  const mine = COURSES.filter(c=>owned.includes(c.id));
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">My Courses</h1>
      {mine.length===0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">You haven't purchased any courses yet.</div>
      ):(
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {mine.map(c=>(
            <div key={c.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <div className="text-sm text-slate-400">{c.level} • {c.duration}</div>
              <div className="font-semibold mt-1">{c.title}</div>
              <Button className="mt-4 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15">Continue →</Button>
              <Button className="mt-4 rounded-xl px-3 py-2 bg-white text-black border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500 before:rounded-xl before:-z-10 before:m-[-2px]">Continue →</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
