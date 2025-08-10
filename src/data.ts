
export type Course = {
  id: number;
  title: string;
  level: string;
  duration: string;
  price: number;
  bullets: string[];
};

export const COURSES: Course[] = [
  {
    id: 1,
    title: "Basic Communication Skills",
    level: "Beginner",
    duration: "2 weeks",
    price: 49.99,
    bullets: [
      "Overcome anxiety and nervousness during presentations",
      "Improve your body language and voice projection",
      "Practice with realistic VR audiences and scenarios",
      "Receive detailed AI feedback on your performance",
    ],
  },
  {
    id: 2,
    title: "Team Collaboration Basics",
    level: "Beginner",
    duration: "3 weeks",
    price: 59.99,
    bullets: [
      "Master standups & sprint rituals",
      "Give and receive feedback effectively",
      "Resolve conflicts with empathy",
      "Run productive retrospectives",
    ],
  },
  {
    id: 3,
    title: "Customer Service Fundamentals",
    level: "Beginner",
    duration: "2 weeks",
    price: 44.99,
    bullets: [
      "Build rapport fast",
      "De‑escalate tense situations",
      "Handle objections clearly",
      "Measure CSAT & close the loop",
    ],
  },
];
