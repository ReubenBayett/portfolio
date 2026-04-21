import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs,
  SiPython, SiVuedotjs, SiNextdotjs, SiTailwindcss,
  SiPostgresql, SiMongodb, SiDocker, SiGit,
  SiGraphql, SiFigma, SiRedis, SiSocketdotio,
  SiFirebase, SiTensorflow, SiWordpress, SiPhp,
  SiHtml5, SiCss, SiSass
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { TbBrandReactNative } from 'react-icons/tb';

const techConfig: Record<string, { icon: React.ElementType; color: string }> = {
  'React': { icon: SiReact, color: '#61DAFB' },
  'React Native': { icon: TbBrandReactNative, color: '#61DAFB' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'TailwindCSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Git': { icon: SiGit, color: '#F05032' },
  'GraphQL': { icon: SiGraphql, color: '#E10098' },
  'Figma': { icon: SiFigma, color: '#F24E1E' },
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'Socket.io': { icon: SiSocketdotio, color: '#010101' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'TensorFlow.js': { icon: SiTensorflow, color: '#FF6F00' },
  'AWS': { icon: FaAws, color: '#FF9900' },
  'AWS S3': { icon: FaAws, color: '#FF9900' },
  'WordPress': { icon: SiWordpress, color: '#21759B' },
  'PHP': { icon: SiPhp, color: '#777BB4' },
  'HTML': { icon: SiHtml5, color: '#E34F26' },
  'CSS': { icon: SiCss, color: '#1572B6' },
  'SCSS': { icon: SiSass, color: '#CC6699' },
  'Chart.js': { icon: SiJavascript, color: '#FF6384' },
  'CoinGecko API': { icon: SiJavascript, color: '#8DC63F' },
  'HealthKit': { icon: SiReact, color: '#FF2D55' },
};

interface TechIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function TechIcon({ name, size = 'md', showLabel = true }: TechIconProps) {
  const config = techConfig[name];
  const IconComponent = config?.icon;
  const color = config?.color || '#666666';

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono border-2 transition-all hover:scale-105 ${sizeClasses[size]}`}
      style={{ borderColor: color, color: color }}
    >
      {IconComponent && <IconComponent size={iconSizes[size]} />}
      {showLabel && <span className="text-black text-xs">{name}</span>}
    </span>
  );
}
