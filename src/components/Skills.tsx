import type { ResumeData } from '../types/resume';

interface SkillsProps {
  skills: ResumeData['skills'];
}

export const Skills = ({ skills }: SkillsProps) => (
  <section className="section break-inside-avoid">
    <h2 className="section-title">Skills</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-6 print:gap-3">
      {skills.map((category) => (
        <div key={category.category} className="card print:p-2">
          <h3 className="text-sm font-semibold text-accent print:text-black uppercase tracking-wide mb-3 print:mb-2">
            {category.category}
          </h3>
          <div className="flex flex-wrap gap-2 print:gap-1">
            {category.items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 print:px-2 print:py-0.5 text-sm bg-background rounded-full text-secondary border border-border"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
