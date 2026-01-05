import { Briefcase, MapPin } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface ExperienceProps {
  experience: ResumeData['experience'];
}

export const Experience = ({ experience }: ExperienceProps) => (
  <section className="section">
    <h2 className="section-title">Experience</h2>
    <div className="space-y-8">
      {experience.map((job) => (
        <article
          key={`${job.company}-${job.period}`}
          className="relative pl-6 border-l-2 border-border break-inside-avoid"
        >
          <div className="absolute -left-[9px] top-[5px] w-4 h-4 rounded-full bg-accent mb-2" />
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-primary mb-2">{job.role}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-secondary">
              <span className="flex items-center gap-1">
                <Briefcase size={14} />
                {job.company}
              </span>
              <span className="text-sm">{job.period}</span>
              {job.location && (
                <span className="flex items-center gap-1 text-sm">
                  <MapPin size={14} />
                  {job.location}
                </span>
              )}
            </div>
          </div>
          {job.achievements && job.achievements.length > 0 && (
            <ul className="mt-3 space-y-2">
              {job.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="text-secondary text-sm leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent"
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
