import Card from "../../atom/card/Card";
import Button from "../../atom/button/Button";
import type {Course} from "../../../data";

export default function CourseCard({ c, onView }:{ c: Course; onView: (id:number)=>void; }){
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">{c.level}</span>
        <span className="text-slate-400">• {c.duration}</span>
      </div>
      <h3 className="mt-2 font-semibold">{c.title}</h3>
      <div className="mt-4 flex items-center justify-between">
        <Button variant="secondary" onClick={()=>onView(c.id)}>View Details →</Button>
        <div className="text-slate-200 font-semibold">${'{'}c.price.toFixed(2){'}'}</div>
      </div>
    </Card>
  );
}
