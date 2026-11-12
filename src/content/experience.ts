/**
 * Work history, most recent first. Source of truth: resume.md.
 *
 * Highlights are written outcome-first — the result leads, the technology
 * follows. The quantified wins (5x latency, ~$100k saved, 2 engineer-days per
 * push, 300+ students) are the strongest material here and sit at the top of
 * their respective roles rather than buried mid-bullet.
 */

export interface Role {
  company: string;
  title: string;
  location: string;
  /** Display string, e.g. 'Dec 2023'. */
  start: string;
  /** Display string, or 'Present'. */
  end: string;
  /** Outcome-first bullets. Aim for 2-4 per role; fewer for older roles. */
  highlights: string[];
  /** Technologies worth surfacing as chips. Keep to the load-bearing ones. */
  tech?: string[];
}

export const experience: Role[] = [
  {
    company: 'Bloomberg LP',
    title: 'Software Engineer',
    location: 'New York, NY',
    start: 'Dec 2023',
    end: 'Present',
    highlights: [
      'Build and scale high-performance fixed income trading systems (Sell-Side OMS) in C++, supporting price discovery, order execution, and venue-specific workflows across multiple asset classes over FIX.',
      'Significantly improved throughput and reliability by identifying bottlenecks in low-latency distributed architecture, applying Kafka, sharding, caching, and multithreading.',
      'Deliver trading features end-to-end with product managers and stakeholders, from system design through production rollout.',
      'Strengthened reliability and observability by defining SLIs/SLOs and building service health dashboards.',
      "Contribute to Bloomberg's internal AI platform: an LLM-powered PR review bot, extensions to internal GitHub MCP tooling, AI-automated dead code detection and removal, and a semantic code search (RAG) workflow that lets LLMs triage client issues and production crashes.",
    ],
    tech: ['C++', 'Kafka', 'FIX', 'Multithreading', 'RAG', 'MCP'],
  },
  {
    company: 'Bloomberg LP',
    title: 'Software Engineering Intern',
    location: 'New York, NY',
    start: 'May 2023',
    end: 'Aug 2023',
    highlights: [
      'Cut latency of commonly used functions in an internal production-failure analysis tool by 5x using multithreading, helping engineers resolve client issues faster.',
      'Enhanced internal tooling for identifying and analyzing production failures on the Execution Management System team within Trading Analytics.',
      'Worked across the Humio API and Kafka messaging system.',
    ],
    tech: ['C++', 'Multithreading', 'Kafka', 'Humio'],
  },
  {
    company: 'Georgia Tech College of Computing',
    title: 'Undergraduate Teaching Assistant',
    location: 'Atlanta, GA',
    start: 'Jan 2021',
    end: 'Dec 2023',
    highlights: [
      'Supported over 300 students across CS1332 (Data Structures & Algorithms, Java), CS2050 (Discrete Math), and ECE4180 (Embedded Systems Design, C++).',
      'Held office hours covering concepts, testing, and debugging, and gave in-depth written feedback on assignments and exams.',
    ],
    tech: ['Java', 'C++'],
  },
  {
    company: 'Cognosos Inc',
    title: 'Engineering Intern',
    location: 'Atlanta, GA',
    start: 'Aug 2022',
    end: 'Dec 2022',
    highlights: [
      'Saved engineers over two days of firmware validation per push by building a GitHub Actions CI/CD workflow that automated hardware testing on every commit.',
      'Automated firmware validation, regression, unit, and board testing using Python, pytest, YAML, and shell scripts over serial communication with embedded Linux devices and test equipment.',
      'Shipped automated test logs to AWS OpenSearch via ElasticSearch for detailed analysis and querying.',
    ],
    tech: ['Python', 'pytest', 'GitHub Actions', 'AWS OpenSearch', 'Embedded Linux'],
  },
  {
    company: 'NCR Corporation',
    title: 'Software Engineering Intern',
    location: 'Atlanta, GA',
    start: 'May 2022',
    end: 'Aug 2022',
    highlights: [
      'Shipped new client-facing order status board functionality: React + TypeScript frontend backed by a Go service integrating existing REST APIs, streaming live updates over websockets.',
      'Created a RESTful API in Go for backend-to-frontend communication, tested and debugged with Postman.',
      'Wrote extensive unit tests and automated integration testing using behavior-driven development (Gherkin) in Python.',
      'Worked on an agile scrum team across two projects: Order Status Board and Food Kiosk.',
    ],
    tech: ['Go', 'React', 'TypeScript', 'WebSockets', 'Python'],
  },
  {
    company: 'NCR Corporation',
    title: 'Software Engineering Intern',
    location: 'Atlanta, GA',
    start: 'May 2021',
    end: 'Aug 2021',
    highlights: [
      'Saved over $100,000 and made log retrieval 3x faster by building BigQuery materialized views over parsed point-of-sale logs, used for data aggregation and error detection during failures.',
      'Built a GCP microservice pipeline in Node.js letting customers upload POS log files through a React web app, parsing them to JSON and loading them into BigQuery.',
      'Coded a multithreaded C# GUI to parse, analyze, and upload customer point-of-sale logs to BigQuery.',
    ],
    tech: ['Node.js', 'GCP', 'BigQuery', 'C#', 'React'],
  },
  {
    company: 'Georgia Tech Research Institute',
    title: 'Undergraduate Research Assistant',
    location: 'Atlanta, GA',
    start: 'Jul 2020',
    end: 'Mar 2021',
    highlights: [
      'Developed accessible block-coding CS and robotics material for K-12 students with learning disabilities at the Georgia Tech Human-Computer Interaction lab, under Dr. Mahender Mandala.',
      'Coded robot functionality in C++ using multithreading and object-oriented design.',
    ],
    tech: ['C++', 'Multithreading'],
  },
  {
    company: 'IDC Hive Makerspace',
    title: 'Peer Instructor',
    location: 'Atlanta, GA',
    start: 'Jan 2020',
    end: 'Dec 2023',
    highlights: [
      'Taught over 200 users to safely operate 3D printers, laser cutters, and machine shop equipment.',
      'Helped students test and debug project circuits using multimeters and waveform generators.',
    ],
  },
];
