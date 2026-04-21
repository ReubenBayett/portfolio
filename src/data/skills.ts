import { IconType } from 'react-icons';
import { 
  SiReact, SiTypescript, SiNodedotjs, 
  SiPython, SiTailwindcss,
  SiPostgresql, SiMongodb, SiDocker,
  SiGit, SiSharp, SiDotnet
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

export const skills: Skill[] = [
  { name: 'C#', icon: SiSharp, color: '#239120', level: 85, category: 'backend' },
  { name: 'ASP.NET', icon: SiDotnet, color: '#512BD4', level: 82, category: 'backend' },
  { name: 'React', icon: SiReact, color: '#61DAFB', level: 92, category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 88, category: 'frontend' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 90, category: 'backend' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', level: 78, category: 'tools' },
  { name: 'Azure', icon: VscAzure, color: '#0078D4', level: 75, category: 'tools' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', level: 85, category: 'database' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 85, category: 'database' },
  { name: 'Python', icon: SiPython, color: '#3776AB', level: 80, category: 'backend' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 75, category: 'tools' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 90, category: 'frontend' },
  { name: 'Git', icon: SiGit, color: '#F05032', level: 92, category: 'tools' },
];
