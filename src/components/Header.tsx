import { MapPin } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  personal: ResumeData['personal'];
}

export const Header = ({ personal }: HeaderProps) => (
  <header className="relative flex flex-col md:flex-row print:flex-row items-center md:items-start print:items-start gap-6 md:gap-8 print:gap-4 pb-8 print:pb-4 border-b border-border">
    <ThemeToggle />
    {personal.photo && (
      <div className="w-24 h-24 md:w-32 md:h-32 print:w-20 print:h-20 rounded-full overflow-hidden bg-surface flex-shrink-0">
        <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="text-center md:text-left print:text-left">
      <h1 className="text-3xl md:text-4xl lg:text-5xl print:text-3xl font-bold text-primary mb-2 print:mb-1">
        {personal.name}
      </h1>
      <p className="text-xl md:text-2xl print:text-xl text-secondary mb-3 print:mb-1">
        {personal.title}
      </p>
      <div className="flex items-center justify-center md:justify-start print:justify-start gap-2 text-secondary">
        <MapPin size={18} className="text-accent print:text-black" aria-hidden="true" />
        <span>{personal.location}</span>
      </div>
    </div>
  </header>
);
