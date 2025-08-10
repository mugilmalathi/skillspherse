import Button from "../../components/atom/button/button";
import { COURSES } from "../../data";
import { CheckCircle2 } from "lucide-react";

export default function CourseDetail({
                                       id,
                                       onCheckout,
                                     }: {
  id: number;
  onCheckout: (id: number) => void;
}) {
  const c = COURSES.find((x) => x.id === id);
  if (!c) return <div className="p-10">Course not found.</div>;

  return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Button
            className="text-sm text-slate-400 hover:text-slate-200"
            onClick={() => history.back()}
        >
          &larr; Back to Courses
        </Button>

        <div className="mt-6 bg-slate-900/70 border border-white/10 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm">
              <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">
                {c.level}
              </span>
                <span className="text-slate-400">{c.duration}</span>
              </div>
              <h1 className="mt-2 text-3xl font-semibold">{c.title}</h1>
            </div>

            <div className="text-right">
              <div className="text-2xl font-semibold">
                ${c.price.toFixed(2)}
              </div>
              <Button
                  onClick={() => onCheckout(c.id)}
                  className="mt-3 rounded-xl px-3 py-2 bg-white text-black border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-fuchsia-500 before:rounded-xl before:-z-10 before:m-[-2px]"
              >
                Buy Now
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">What you'll learn:</h3>
            <ul className="grid gap-2">
              {c.bullets.map((b, i) => (
                  <li
                      key={i}
                      className="inline-flex items-center gap-2 text-slate-300"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {b}
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}
