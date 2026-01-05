import { Briefcase, MapPin } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface ExperienceProps {
  experience: ResumeData['experience'];
}

export const Experience = ({ experience }: ExperienceProps) => (
  <section className="section">
    <h2 className="section-title">Experience</h2>
    <div className="space-y-8 print:space-y-4">
      {experience.map((job) => (
        <article
          key={`${job.company}-${job.period}`}
          className="relative pl-6 border-l-2 border-border break-inside-avoid"
        >
          <div className="absolute -left-[9px] top-[5px] w-4 h-4 print:w-3 print:h-3 print:-left-[7px] rounded-full bg-accent print:bg-black mb-2" />
          <div className="mb-2 print:mb-1">
            <h3 className="text-lg font-semibold text-primary mb-2 print:mb-1">{job.role}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-secondary">
              <span className="flex items-center gap-1">
                <Briefcase size={14} aria-hidden="true" />
                {job.company}
              </span>
              <span className="text-sm">{job.period}</span>
              {job.location && (
                <span className="flex items-center gap-1 text-sm">
                  <MapPin size={14} aria-hidden="true" />
                  {job.location}
                </span>
              )}
            </div>
          </div>
          {job.achievements && job.achievements.length > 0 && (
            <ul className="mt-3 print:mt-1 space-y-2 print:space-y-1">
              {job.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="text-secondary leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent print:before:text-black"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  </section>
);
