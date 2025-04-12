'use client';

/**
 * UB Reader Home Page
 */
import './page.css';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function HomePage() {
  const { uiTheme, toggleUITheme } = useTheme();

  return (
    <div className="home-page">
      <header className="header">
        <h1>UB Reader</h1>
        <button onClick={toggleUITheme} className="theme-toggle-button">
          {uiTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>
      <main className="main-content">
        <section className="welcome-section">
          <h2>Welcome to the UB Reader</h2>
          <p>
            This is the home page for the UB Reader application, showcasing the new architecture
            with light/dark theme support.
          </p>

          <div className="paper-links">
            <h3>Featured Content</h3>
            <Link href="/traditional-reader/1" className="paper-link">
              <div className="paper-card">
                <h4>Paper 1: The Universal Father</h4>
                <p>Read Paper 1 in the traditional reader format</p>
              </div>
            </Link>

            <Link href="/contents" className="paper-link">
              <div className="paper-card">
                <h4>Table of Contents</h4>
                <p>Browse all available papers</p>
              </div>
            </Link>
          </div>

          <p className="commit-message">
            Latest update: &quot;Added light/dark theme support and Paper 1 links&quot;
          </p>
        </section>
      </main>

      <style>{`
        .theme-toggle-button {
          padding: 8px 16px;
          background-color: ${uiTheme === 'light' ? '#333' : '#f0f0f0'};
          color: ${uiTheme === 'light' ? '#fff' : '#333'};
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 16px;
        }

        .paper-links {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .paper-card {
          padding: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: all 0.2s ease;
          background-color: ${uiTheme === 'light' ? '#f9f9f9' : '#2a2a2a'};
        }

        .paper-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-color: ${uiTheme === 'light' ? '#0070f3' : '#3291ff'};
        }

        .paper-link {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
}
