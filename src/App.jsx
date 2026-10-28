import { useRef, useState } from 'react'
import './App.css'

const projects = [
  {
    id: 1,
    title: 'Tennis Shot Tracker',
    category: 'React',
    description:
      'A web application for tracking tennis shots, with a React frontend and a Node.js and Express backend.',
    learning:
      'Built experience developing a full-stack application with JavaScript.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'CSS',
      'Node.js',
      'Express',
    ],
    demo: 'https://tennis-shot-tracker.vercel.app/',
    source: 'https://github.com/hplace99/tennis-shot-tracker',
  },
  {
    id: 2,
    title: 'Job Application Tracker',
    category: 'React',
    description:
      'A responsive dashboard for organising job applications, tracking interviews and offers, and searching and filtering opportunities.',
    learning:
      'Practised reusable React components, form validation, state management, and saving data in browser storage.',
    technologies: ['React', 'Vite', 'JavaScript', 'CSS'],
    demo: 'https://application-tracker-phi-beige.vercel.app/',
    source: 'https://github.com/hplace99/application-tracker',
  },
]

const filters = ['All', 'React', 'JavaScript']

const skills = [
  { name: 'HTML', icon: 'html5/html5-original.svg' },
  { name: 'CSS', icon: 'css3/css3-original.svg' },
  {
    name: 'JavaScript',
    icon: 'javascript/javascript-original.svg',
  },
  { name: 'React', icon: 'react/react-original.svg' },
  { name: 'Git', icon: 'git/git-original.svg' },
  { name: 'Vite', icon: 'vitejs/vitejs-original.svg' },
]

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('portfolio-theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
  } catch {
    // Use the system preference when browser storage is unavailable.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')

  const menuButtonRef = useRef(null)

  const visibleProjects = projects.filter(
    (project) =>
      filter === 'All' || project.technologies.includes(filter),
  )

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)

    try {
      localStorage.setItem('portfolio-theme', nextTheme)
    } catch {
      // Theme switching still works without saving the preference.
    }
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleNavigationKeyDown(event) {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu()
      menuButtonRef.current?.focus()
    }
  }

  return (
    <div className="portfolio" data-theme={theme}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <nav
        className="navigation"
        aria-label="Main navigation"
        onKeyDown={handleNavigationKeyDown}
      >
        <a className="brand" href="#home" onClick={closeMenu}>
          Hayden Place<span>.</span>
        </a>

        <div className="navigation-controls">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === 'dark' ? 'light' : 'dark'
            } mode`}
          >
            <span className="theme-icon" aria-hidden="true">
              {theme === 'dark' ? '☾' : '☀'}
            </span>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>

          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="navigation-links"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? 'Close menu' : 'Menu'}
          </button>
        </div>

        <ul
          id="navigation-links"
          className={`navigation-links ${
            menuOpen ? 'is-open' : ''
          }`}
        >
          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>

          <li>
            <a href="#skills" onClick={closeMenu}>
              Skills
            </a>
          </li>

          <li>
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
          </li>

          <li>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <header className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              Junior Developer · Open to opportunities
            </p>

            <h1>
              Hi, I'm Hayden.
              <br />
              I build for the web.
            </h1>

            <p className="hero-description">
              A recent coding course graduate turning ideas into
              useful, accessible websites. Looking for my first
              developer role and opportunities to keep learning.
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="#projects"
              >
                Explore my projects
                <span aria-hidden="true">↓</span>
              </a>

              <a
                className="button button-secondary"
                href="#contact"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="hero-photo">
            <img
              src="/profile.jpg"
              alt="Portrait of Hayden Place"
              width="400"
              height="400"
            />
          </div>
        </header>

        <section id="about" aria-labelledby="about-heading">
          <p className="eyebrow">A little introduction</p>
          <h2 id="about-heading">About me</h2>

          <p className="section-description">
            I recently completed a coding course, where I built
            a foundation in HTML, CSS, JavaScript, and React.
            I enjoy solving problems, making interfaces easier
            to use, and understanding how things work.
          </p>

          <p className="section-description">
            I'm looking for a junior role where I can contribute
            to real projects, learn from experienced developers,
            and grow with a team.
          </p>
        </section>

        <section id="skills" aria-labelledby="skills-heading">
          <p className="eyebrow">My toolkit</p>
          <h2 id="skills-heading">Skills I'm building with</h2>

          <ul className="skills">
            {skills.map((skill) => (
              <li key={skill.name}>
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${skill.icon}`}
                  alt=""
                  width="24"
                  height="24"
                  loading="lazy"
                />
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
        >
          <p className="eyebrow">Learning through building</p>
          <h2 id="projects-heading">Selected projects</h2>

          <p className="section-description">
            A closer look at what I've built and what I've learned.
          </p>

          <div
            className="filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <p className="project-count" role="status">
            Showing {visibleProjects.length}{' '}
            {visibleProjects.length === 1
              ? 'project'
              : 'projects'}
          </p>

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project" key={project.id}>
                <p className="project-category">
                  {project.category}
                </p>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <ul
                  className="project-tags"
                  aria-label="Technologies used"
                >
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <div className="project-learning">
                  <h4>What I learned</h4>
                  <p>{project.learning}</p>
                </div>

                <div className="project-links">
                  <a
                    href={project.demo}
                    aria-label={`View ${project.title} live demo`}
                  >
                    Live demo ↗
                  </a>

                  <a
                    href={project.source}
                    aria-label={`View ${project.title} source code`}
                  >
                    Source code ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="contact"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <p className="eyebrow">Let's connect</p>

          <h2 id="contact-heading">
            Have an opportunity in mind?
          </h2>

          <p className="section-description">
            I'd love to hear about junior developer roles and
            opportunities to contribute to a team.
          </p>

          <a
            className="button button-primary"
            href="mailto:you@example.com"
          >
            Email me
          </a>

          <div className="linkedin-link">
            <a
              href="https://www.linkedin.com/in/hayden-place/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Hayden Place on LinkedIn (opens in a new tab)"
            >
              Connect on LinkedIn ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Hayden Place.
          {' '}Built with React.
        </p>

        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App