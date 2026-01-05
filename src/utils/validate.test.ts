import { describe, it, expect } from 'vitest';
import { validateResumeData } from './validate';

const validData = {
  personal: {
    name: 'John Doe',
    title: 'Developer',
    location: 'Kyiv, Ukraine',
  },
  about: 'A passionate developer',
  experience: [
    {
      company: 'Tech Corp',
      role: 'Developer',
      period: '2020 - Present',
      achievements: ['Built apps'],
    },
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript'],
    },
  ],
  education: [
    {
      institution: 'University',
      degree: 'BSc Computer Science',
      period: '2016 - 2020',
    },
  ],
  contacts: {
    email: 'john@example.com',
  },
};

describe('validateResumeData', () => {
  it('accepts valid resume data', () => {
    const result = validateResumeData(validData);
    expect(result.valid).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.errors).toBeUndefined();
  });

  it('rejects data with missing required fields', () => {
    const invalidData = {
      personal: {
        name: 'John Doe',
      },
    };

    const result = validateResumeData(invalidData);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it('rejects data with invalid types', () => {
    const invalidData = {
      ...validData,
      experience: 'not an array',
    };

    const result = validateResumeData(invalidData);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.some((e) => e.includes('experience'))).toBe(true);
  });
});

