// This is the entry point for the TinaCMS admin interface
export default function AdminPage() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      lineHeight: '1.5'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>TinaCMS Admin</h1>
      
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Self-Hosted TinaCMS Setup</h2>
        <p>
          You're using the self-hosted version of TinaCMS, which doesn't require any external services or accounts.
          The TinaCMS admin interface is currently showing an error because it's trying to load assets from an external source.
        </p>
        <p>
          To use TinaCMS with this self-hosted setup:
        </p>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li>Edit content directly in the <code>content</code> directory</li>
          <li>Use the TinaDocumentLoader component to display content in your application</li>
          <li>View the example at <a href="/tina-example" style={{ color: '#0070f3', textDecoration: 'underline' }}>/tina-example</a></li>
        </ol>
      </div>
      
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Alternative: TinaCMS Cloud</h2>
        <p>
          If you want to use the full TinaCMS admin interface with all features, you can sign up for TinaCMS Cloud at
          <a href="https://tina.io" target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'underline' }}> tina.io</a>.
        </p>
        <p>
          This is optional and not required for the current implementation to work.
        </p>
      </div>
      
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Documentation</h2>
        <p>
          For more information about using TinaCMS with this project, see the
          <a href="https://github.com/tinacms/tinacms" target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'underline' }}> TinaCMS documentation</a>.
        </p>
      </div>
    </div>
  );
}