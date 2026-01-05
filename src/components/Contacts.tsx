import { Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface ContactsProps {
  contacts: ResumeData['contacts'];
}

const contactItems = [
  { key: 'email', icon: Mail, prefix: 'mailto:' },
  { key: 'phone', icon: Phone, prefix: 'tel:' },
  { key: 'linkedin', icon: Linkedin, prefix: '' },
  { key: 'github', icon: Github, prefix: '' },
  { key: 'website', icon: Globe, prefix: '' },
] as const;

export const Contacts = ({ contacts }: ContactsProps) => {
  const getDisplayValue = (key: string, value: string): string => {
    if (key === 'linkedin') {
      return value
        .replace('https://linkedin.com/in/', '')
        .replace('https://www.linkedin.com/in/', '');
    }
    if (key === 'github') {
      return value.replace('https://github.com/', '');
    }
    if (key === 'website') {
      return value.replace('https://', '').replace('http://', '');
    }

    return value;
  };

  return (
    <section className="section">
      <h2 className="section-title">Contacts</h2>
      <div className="grid grid-cols-2 gap-4">
        {contactItems.map(({ key, icon: Icon, prefix }) => {
          const value = contacts[key as keyof typeof contacts] as string | undefined;

          if (!value) return null;

          const href = prefix ? `${prefix}${value}` : value;
          const displayValue = getDisplayValue(key, value as string);

          const isPrintHidden = ['linkedin', 'github'].includes(key);

          return (
            <a
              key={key}
              href={href}
              target={key !== 'email' && key !== 'phone' ? '_blank' : undefined}
              rel={key !== 'email' && key !== 'phone' ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-2 px-4 py-2 bg-surface rounded-lg text-secondary hover:text-primary hover:bg-border transition-colors ${isPrintHidden ? 'print:hidden' : ''}`}
            >
              <Icon size={18} className="text-accent print:text-black" />
              <span className="text-sm">{displayValue}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};
