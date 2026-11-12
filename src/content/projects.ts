/**
 * Featured projects.
 *
 * Ordering is intentional: ECE4122-Multithreading sits first because it is the
 * only project that reinforces the professional story (concurrent, low-latency
 * C++) rather than sitting apart from it. GtScheduler follows as the most
 * product-like. CS4641-ML-Project is deliberately excluded from the featured
 * set — it is forked and group-authored, which is weak attribution to land a
 * reader on.
 *
 * NOTE: repoUrl values point at the older `yash3090` account, where these
 * repos live. See the open decision in agents/plan.md about consolidating onto
 * `yashs3090`.
 *
 * GestureBot and FruitNinja are physical and visual — a short GIF in
 * public/media/ for each would do more than their bullets do.
 */

export interface Project {
  /** URL-safe id, used for /projects/:slug detail pages in a later phase. */
  slug: string;
  title: string;
  /** One line. What it is, not how it was built. */
  summary: string;
  tech: string[];
  highlights: string[];
  repoUrl?: string;
  demoUrl?: string;
  /** Path under /public, e.g. '/media/gesturebot.gif'. */
  mediaUrl?: string;
  /** Alt text is required whenever mediaUrl is set. */
  mediaAlt?: string;
  featured: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    slug: 'ece4122-multithreading',
    title: 'Advanced Programming Techniques',
    summary:
      'Coursework projects in high-performance C++ — multithreading, OpenMP parallelism, OpenGL graphics, and batch job execution.',
    tech: ['C++', 'OpenMP', 'OpenGL', 'Multithreading'],
    highlights: [
      'Built concurrent and parallel programs with OpenMP, becoming proficient in thread coordination and shared-state correctness.',
      'Implemented real-time OpenGL graphics workloads alongside batch-processing jobs.',
      'The foundation for the low-latency, multithreaded C++ work that followed at Bloomberg.',
    ],
    repoUrl: 'https://github.com/yash3090/ECE4122-Multithreading',
    featured: true,
    year: '2022',
  },
  {
    slug: 'gtscheduler',
    title: 'GtScheduler',
    summary:
      'A course scheduling tool for Georgia Tech students, built in Java.',
    tech: ['Java'],
    highlights: [
      'Generates conflict-free class schedules from course selections.',
      'Built around real constraints students hit during registration.',
    ],
    repoUrl: 'https://github.com/yash3090/GtScheduler',
    featured: true,
    year: '2022',
  },
  {
    slug: 'gesturebot',
    title: 'GestureBot',
    summary:
      'A glove-controlled robot car: hand gestures steer a Raspberry Pi rover over a local network.',
    tech: ['C++', 'Python', 'MBED', 'Raspberry Pi', 'Selenium'],
    highlights: [
      'Ran multiple concurrent threads on the glove-mounted MBED to read accelerometers, poll buttons for speed and light control, and update a local webserver hosted by an attached wireless chip.',
      'Assembled a Raspberry Pi 3 robot car whose Python controller used Selenium as a webdriver to scrape commands from the glove’s server and drive the motors.',
      'Gesture direction, plus on-glove buttons for speed and lighting.',
    ],
    repoUrl: 'https://github.com/yash3090/ECE4180-GestureBot',
    featured: true,
    year: '2022',
  },
  {
    slug: 'fruit-ninja-mbed',
    title: 'Fruit Ninja on MBED',
    summary:
      'A Fruit Ninja-style game running on an MBED microcontroller, rendered to an onboard screen.',
    tech: ['C++', 'MBED', 'Accelerometer'],
    highlights: [
      'Rendered live gameplay to an LCD driven directly by the microcontroller.',
      'Dual input modes: an accelerometer-based motion controller or physical buttons.',
    ],
    repoUrl: 'https://github.com/yash3090/FruitNinja-Game-MBED',
    featured: true,
    year: '2022',
  },
  {
    slug: 'cs4641-ml',
    title: 'CS4641 Machine Learning Project',
    summary: 'Group machine learning coursework project in Jupyter.',
    tech: ['Python', 'Jupyter'],
    highlights: ['Applied supervised learning methods to a course dataset.'],
    repoUrl: 'https://github.com/yash3090/CS4641-ML-Project',
    featured: false,
    year: '2022',
  },
];
