export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  duration: string;
  role: string;
  year: number;
}

export const projects: Project[] = [
  {
    id: "taskflow",
    title: "TaskFlow",
    shortDescription: "A modern project management app with real-time collaboration features.",
    fullDescription: "TaskFlow is a comprehensive project management solution designed for remote teams. It features real-time collaboration, drag-and-drop task boards, and detailed analytics.",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop"],
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    features: ["Real-time collaboration", "Kanban boards", "Team chat"],
    challenges: ["Implementing real-time sync"],
    duration: "6 months",
    role: "Lead Developer",
    year: 2024
  },
  {
    id: "cryptowatch",
    title: "CryptoWatch",
    shortDescription: "Real-time cryptocurrency tracking dashboard with portfolio management.",
    fullDescription: "CryptoWatch provides real-time cryptocurrency price tracking and portfolio management tools.",
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=800&fit=crop"],
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["Next.js", "TypeScript", "TailwindCSS"],
    features: ["Real-time price updates", "Portfolio tracking"],
    challenges: ["Handling data updates efficiently"],
    duration: "3 months",
    role: "Frontend Developer",
    year: 2023
  }
];
