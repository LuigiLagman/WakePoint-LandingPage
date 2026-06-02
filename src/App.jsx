const highlights = [
  {
    title: 'Fast setup',
    text: 'A small, modern React starter that is easy to build on.',
  },
  {
    title: 'Simple layout',
    text: 'A clean hero, value points, and one clear call to action.',
  },
  {
    title: 'Responsive by default',
    text: 'Readable on mobile and desktop without extra work.',
  },
];

function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">WakePoint</p>
        <h1>Build a landing page that feels focused from the first screen.</h1>
        <p className="hero-copy">
          This React starter gives your group a clean base for a simple landing
          page, with room to add features later.
        </p>

        <div className="actions">
          <a className="button button-primary" href="#details">
            Get started
          </a>
          <a className="button button-secondary" href="#contact">
            View contact
          </a>
        </div>
      </section>

      <section className="cards" id="details" aria-label="Highlights">
        {highlights.map((item) => (
          <article className="card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="cta" id="contact">
        <div>
          <p className="cta-label">Ready to continue</p>
          <h2>Now the project has a real React starting point.</h2>
        </div>
        <a className="button button-dark" href="mailto:hello@wakepoint.dev">
          hello@wakepoint.dev
        </a>
      </section>
    </main>
  );
}

export default App;