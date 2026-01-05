import { GraduationCap, MapPin } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface EducationProps {
  education: ResumeData['education'];
}

export const Education = ({ education }: EducationProps) => (
  <section className="section break-inside-avoid">
    <h2 className="section-title">Education</h2>
    <div className="space-y-4 print:space-y-2">
      {education.map((edu) => (
        <div key={`${edu.institution}-${edu.period}`} className="card print:p-2">
          <div className="flex items-start gap-4 print:gap-2">
            <div className="p-2 print:p-1 bg-background print:bg-white rounded-lg">
              <GraduationCap
                size={24}
                className="text-accent print:text-black print:w-5 print:h-5"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="font-semibold text-primary">{edu.degree}</h3>
              <p className="text-secondary">{edu.institution}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-secondary">
                <span>{edu.period}</span>
                {edu.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} aria-hidden="true" />
                    {edu.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
