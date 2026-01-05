import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { ResumeData } from '../types/resume';
import schema from '../data/resume-data.schema.json';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);

const validate = ajv.compile<ResumeData>(schema);

export interface ValidationResult {
  valid: boolean;
  data?: ResumeData;
  errors?: string[];
}

export const validateResumeData = (data: unknown): ValidationResult => {
  const isValid = validate(data);

  if (isValid) {
    return {
      valid: true,
      data: data as ResumeData,
    };
  }

  const errors =
    validate.errors?.map((err) => {
      const path = err.instancePath || 'root';

      return `${path}: ${err.message}`;
    }) ?? [];

  return {
    valid: false,
    errors,
  };
};

export const loadResumeData = async (): Promise<ResumeData> => {
  const fs = await import('fs/promises');
  const path = await import('path');

  const dataPath = path.resolve(process.cwd(), 'src/data/resume-data.json');

  try {
    const content = await fs.readFile(dataPath, 'utf-8');
    const data = JSON.parse(content);
    const result = validateResumeData(data);

    if (!result.valid) {
      throw new Error(`Invalid resume data:\n${result.errors?.join('\n')}`);
    }

    return result.data!;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(
        'resume-data.json not found. Copy resume-data.example.json to resume-data.json and fill in your data.'
      );
    }
    throw error;
  }
};
