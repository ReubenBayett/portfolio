export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
  logo: string;
}

export const experiences: Experience[] = [
  {
    id: "fs-health",
    company: "Free State Department of Health",
    role: "Software Developer",
    location: "Free State, SA",
    startDate: "Apr 2024",
    endDate: "Present",
    current: true,
    description: "Co-led the end-to-end development of a departmental service desk system, overseeing the full software development lifecycle (SDLC) for 10,000+ users.",
    achievements: [
      "Co-led the end-to-end development of a departmental service desk system for 10,000+ users",
      "Engineered robust internal APIs and managed project deployments ensuring seamless data flow",
      "Spearheaded technical excellence through rigorous code reviews and comprehensive unit testing",
      "Designed and implemented scalable solutions to support a large-scale user base"
    ],
    techStack: ["React", "Node.js", "SQL", "PostgreSQL", "API Design", "Testing"],
    logo: "🏥"
  },
  {
    id: "freelance",
    company: "Self-Employed (Freelance)",
    role: "Software Developer",
    location: "Remote",
    startDate: "Jan 2023",
    endDate: "Apr 2024",
    current: false,
    description: "Engineered and deployed end-to-end web applications for various clients using modern web technologies.",
    achievements: [
      "Engineered and deployed end-to-end web applications using MERN stack",
      "Developed secure RESTful APIs with JWT authentication",
      "Integrated third-party services like Stripe and AWS S3",
      "Managed project timelines using Agile methodologies"
    ],
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "Stripe", "AWS"],
    logo: "💼"
  }
];
