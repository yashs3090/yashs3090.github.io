/**
 * Skills, grouped.
 *
 * Deliberately not the flat 30-item comma list from resume.md. Groups are
 * ordered by depth: the first group is what Yash actually builds with daily,
 * and `primary` marks the handful a 45-second skim should land on.
 */

export interface SkillGroup {
  label: string;
  items: string[];
}

/** Surfaced as a compact lead-in row above the full grid. */
export const primarySkills: string[] = ['C++', 'Python', 'Go', 'TypeScript'];

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      'C++',
      'Python',
      'Go',
      'TypeScript',
      'Java',
      'JavaScript',
      'C',
      'C#',
      'SQL',
      'Shell',
    ],
  },
  {
    label: 'Systems & Infrastructure',
    items: [
      'Kafka',
      'Docker',
      'AWS',
      'Google Cloud Platform',
      'Linux',
      'Git',
      'Apache Spark',
      'Humio',
      'Wireshark',
    ],
  },
  {
    label: 'Web',
    items: ['React', 'Node.js', 'REST', 'WebSockets', 'HTML', 'CSS'],
  },
  {
    label: 'AI & ML',
    items: ['TensorFlow', 'RAG pipelines', 'MCP tooling', 'LLM evaluation', 'Computer Vision'],
  },
  {
    label: 'Embedded & Hardware',
    items: ['MBED', 'Arduino', 'Microcontrollers', 'PCB Design', 'VHDL', 'Verilog'],
  },
];
