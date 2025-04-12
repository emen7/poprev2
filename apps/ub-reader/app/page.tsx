'use client';

/**
 * UB Reader Home Page
 */
import './page.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <h1>UB Reader</h1>
      </header>
      <main className="main-content">
        <section className="welcome-section">
          <h2>Welcome to the UB Reader</h2>
          <p>
            This is the home page for the UB Reader application. The example pages have been
            temporarily archived during deployment optimization.
          </p>
          <p className="commit-message">
            Latest update: "Fix React Hook dependency arrays and unused variables"
          </p>
        </section>
      </main>
    </div>
  );
}
