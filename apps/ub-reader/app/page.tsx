'use client';

/**
 * UB Reader Home Page
 */

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
        </section>
      </main>
      <style jsx>{`
        .home-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: Arial, sans-serif;
        }

        .header {
          background-color: #f8f8f8;
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
        }

        .header h1 {
          margin: 0;
          font-size: 2rem;
          color: #333;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .welcome-section {
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .welcome-section h2 {
          margin-top: 0;
          color: #333;
        }

        .welcome-section p {
          line-height: 1.6;
          color: #555;
        }
      `}</style>
    </div>
  );
}
