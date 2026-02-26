export interface ProfileData {
  description: string;
  features: { text: string }[];
  relatedCourse?: { label: string; href?: string };
}

export const GPT_PROFILES: Record<string, ProfileData> = {
  'Science Tutor': {
    description:
      'Explains biology, physics, and chemistry using farm and village examples that rural students can relate to.',
    features: [
      { text: 'Biology concepts explained with local plant and animal examples' },
      { text: 'Physics principles demonstrated through everyday objects' },
      { text: 'Chemistry basics with simple experiments you can do at home' },
      { text: 'NCERT Class 5-8 syllabus coverage' },
    ],
    relatedCourse: { label: 'Science for Class 5' },
  },
  'Maths Helper': {
    description:
      'Makes arithmetic, fractions, and geometry simple using daily life problems from rural contexts.',
    features: [
      { text: 'Fractions and decimals explained with real market examples' },
      { text: 'Geometry using shapes from nature and buildings' },
      { text: 'Mental math tricks for quick calculations' },
      { text: 'NCERT Maths syllabus for Class 1-8' },
    ],
    relatedCourse: { label: 'Maths Foundations' },
  },
  'Language Guide': {
    description:
      'Teaches reading and writing in Hindi, Tamil, Telugu, and Marathi with fun stories and exercises.',
    features: [
      { text: 'Reading comprehension with local folk tales' },
      { text: 'Writing practice with guided prompts' },
      { text: 'Grammar rules explained simply in your mother tongue' },
      { text: 'Vocabulary building through everyday words' },
    ],
    relatedCourse: { label: 'Hindi Reading' },
  },
  'History & Civics': {
    description:
      "India's history, geography, and civics explained in simple language for every student.",
    features: [
      { text: "Indian history from ancient times to India's independence" },
      { text: 'Geography of India — rivers, mountains, states' },
      { text: 'Civics — how government works, your rights and duties' },
      { text: 'NCERT Social Studies for Class 3-8' },
    ],
    relatedCourse: { label: 'Social Studies Class 5' },
  },
};

export interface MentorProfileData {
  specialty: string;
  about: string;
  achievements: string;
}

export const MENTOR_PROFILES: Record<string, MentorProfileData> = {
  'Science AI': {
    specialty: 'Biology, Physics, Chemistry',
    about:
      'Explains science through rural India examples — from how plants grow in fields to why the sky changes color at sunset.',
    achievements:
      'Covers full NCERT Science curriculum for Class 1-8 in Hindi, Tamil, Telugu, Marathi, Kannada, and Bengali.',
  },
  'Maths AI': {
    specialty: 'Arithmetic, Geometry, Fractions',
    about:
      'Makes maths simple with daily life problems — from counting crops to measuring land and calculating prices at the market.',
    achievements:
      'Covers full NCERT Mathematics curriculum for Class 1-8 with step-by-step solutions in your language.',
  },
  'Language AI': {
    specialty: 'Reading, Writing, Grammar',
    about:
      'Teaches in your mother tongue using folk tales, poems, and stories from across India to build strong reading and writing skills.',
    achievements:
      'Supports Hindi, Tamil, Telugu, Marathi, Kannada, and Bengali with NCERT Language curriculum for Class 1-8.',
  },
  'Social AI': {
    specialty: 'History, Geography, Civics',
    about:
      "India's story told for every student — from ancient civilizations to modern democracy, from Himalayan peaks to coastal plains.",
    achievements:
      'Covers NCERT Social Studies for Class 3-8, including History, Geography, and Civics in simple language.',
  },
};
