import { education } from '../content/education';
import { experience } from '../content/experience';
import { projects } from '../content/projects';
import { site } from '../content/site';
import { primarySkills, skills } from '../content/skills';

/**
 * The resume page carries all substantive content — it absorbed what was
 * originally planned as homepage sections (see docs/decisions/0007).
 *
 * Order is recruiter-first: Experience leads, because that is what a hiring
 * skim is looking for. Skills sit between Experience and Projects as a thin
 * scannable band, not a wall.
 *
 * The PDF is a download, never an <iframe> embed — embedded PDFs degrade badly
 * on mobile. The HTML version is the primary artifact. Print styles live in
 * global.css so Cmd-P on this page produces something usable.
 */
export function Resume() {
  const featured = projects.filter((project) => project.featured);
  const other = projects.filter((project) => !project.featured);

  return (
    <div className="resume">
      {/* ---- header ---- */}
      <section className="section section--tight" aria-labelledby="resume-heading">
        <div className="container">
          <h1 id="resume-heading">Resume</h1>
          <p className="resume__lede">
            {site.title} at Bloomberg, building fixed income trading systems in C++.
            Based in {site.location}.
          </p>
          <ul className="resume__contact">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {site.socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Phase 3: drop resume.pdf into public/ and this link goes live. */}
          <p className="resume__download">
            <a className="button" href="/resume.pdf" download>
              Download PDF
            </a>
          </p>
        </div>
      </section>

      {/* ---- experience ---- */}
      <section className="section" aria-labelledby="experience-heading">
        <div className="container">
          <h2 className="section__title" id="experience-heading">
            Experience
          </h2>
          <ol className="timeline">
            {experience.map((role) => (
              <li className="role" key={`${role.company}-${role.start}`}>
                <div className="role__head">
                  <h3 className="role__title">
                    {role.title} <span className="role__at">&middot;</span>{' '}
                    <span className="role__company">{role.company}</span>
                  </h3>
                  <p className="role__meta">
                    <span>
                      {role.start} &ndash; {role.end}
                    </span>
                    <span aria-hidden="true"> &middot; </span>
                    <span>{role.location}</span>
                  </p>
                </div>

                <ul className="role__highlights">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                {role.tech ? (
                  <ul className="chips" aria-label={`Technologies at ${role.company}`}>
                    {role.tech.map((item) => (
                      <li className="chip" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- skills ---- */}
      <section className="section section--subtle" aria-labelledby="skills-heading">
        <div className="container">
          <h2 className="section__title" id="skills-heading">
            Skills
          </h2>
          <ul className="chips chips--lead" aria-label="Core languages">
            {primarySkills.map((skill) => (
              <li className="chip chip--strong" key={skill}>
                {skill}
              </li>
            ))}
          </ul>

          <dl className="skill-grid">
            {skills.map((group) => (
              <div className="skill-grid__group" key={group.label}>
                <dt className="skill-grid__label">{group.label}</dt>
                <dd className="skill-grid__items">{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- projects ---- */}
      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <h2 className="section__title" id="projects-heading">
            Projects
          </h2>
          <ul className="project-grid">
            {featured.map((project) => (
              <li className="project" key={project.slug}>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__year">{project.year}</p>
                <p className="project__summary">{project.summary}</p>
                <ul className="project__highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <ul className="chips" aria-label={`${project.title} tech stack`}>
                  {project.tech.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                {project.repoUrl ? (
                  <p className="project__links">
                    <a href={project.repoUrl} target="_blank" rel="noreferrer noopener">
                      View repository
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>

          {other.length > 0 ? (
            <p className="project-grid__other">
              Also:{' '}
              {other.map((project, index) => (
                <span key={project.slug}>
                  {index > 0 ? ', ' : ''}
                  {project.repoUrl ? (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer noopener">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </section>

      {/* ---- education ---- */}
      <section className="section section--subtle" aria-labelledby="education-heading">
        <div className="container">
          <h2 className="section__title" id="education-heading">
            Education
          </h2>
          {education.map((entry) => (
            <div className="education" key={entry.school}>
              <h3 className="education__school">{entry.school}</h3>
              <p className="education__degree">
                {entry.degree}
                {entry.secondary ? ` · ${entry.secondary}` : ''}
              </p>
              <p className="education__meta">
                {entry.location} &middot; Class of {entry.graduated}
                {entry.gpa ? ` · ${entry.gpa} GPA` : ''}
              </p>
              {entry.coursework ? (
                <p className="education__coursework">
                  <span className="education__coursework-label">Relevant coursework: </span>
                  {entry.coursework.join(' · ')}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
