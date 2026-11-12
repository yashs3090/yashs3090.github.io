/**
 * Education. Short by design — one entry, with the GPA surfaced because 3.97
 * is strong enough to earn its place next to the degree rather than in a
 * footnote.
 */

export interface Education {
  school: string;
  degree: string;
  /** Secondary credential, e.g. a minor. */
  secondary?: string;
  location: string;
  graduated: string;
  gpa?: string;
  coursework?: string[];
}

export const education: Education[] = [
  {
    school: 'Georgia Institute of Technology',
    degree: 'BS in Computer Engineering',
    secondary: 'Minor in Computer Science (Intelligence)',
    location: 'Atlanta, GA',
    graduated: '2023',
    gpa: '3.97',
    coursework: [
      'Machine Learning',
      'Computer Vision',
      'Computer Architecture',
      'Computer Networking',
      'Intro to AI',
      'Advanced Programming Techniques',
    ],
  },
];
