# Simplified Lectionary CMS Plan

This document outlines the plan for implementing a simplified content management system (CMS) specifically for lectionary authors, while still leveraging the TinaCMS backend for content storage and management.

## Goals

1. Provide a simplified, focused interface for lectionary authors
2. Reduce complexity by showing only relevant fields and options
3. Add lectionary-specific helpers (scripture reference tool, liturgical calendar)
4. Maintain compatibility with the main TinaCMS system
5. Support both creation and editing of lectionary content

## Architecture

The simplified CMS will consist of:

1. **Custom Admin Interface**: A separate admin section specifically for lectionary authors
2. **Simplified Form Components**: Custom form components tailored to lectionary content
3. **Specialized Helpers**: Tools to assist with scripture references and liturgical calendar
4. **TinaCMS Integration**: Backend integration with TinaCMS for content storage

## Directory Structure

```
src/
├── app/
│   └── lectionary-admin/           # Lectionary admin routes
│       ├── page.tsx                # Main admin dashboard
│       ├── layout.tsx              # Admin layout with authentication
│       ├── new/                    # Create new entry
│       │   └── page.tsx            # New entry form
│       └── [id]/                   # Edit existing entry
│           └── page.tsx            # Edit form for specific entry
├── components/
│   └── lectionary/                 # Lectionary-specific components
│       ├── lectionary-form.tsx     # Main form component
│       ├── scripture-helper.tsx    # Scripture reference helper
│       └── calendar-helper.tsx     # Liturgical calendar helper
└── lib/
    └── lectionary-cms/             # Lectionary CMS utilities
        ├── client.ts               # Client for interacting with TinaCMS
        ├── auth.ts                 # Authentication utilities
        └── transforms.ts           # Data transformation utilities
```

## Implementation Details

### 1. Custom Admin Interface

#### Main Dashboard (page.tsx)

- List of existing lectionary entries
- Quick filters by liturgical season
- Create new entry button
- Simple statistics (total entries, entries by season)

#### Layout (layout.tsx)

- Simple authentication check
- Streamlined navigation
- Lectionary-specific branding

#### New Entry Form (new/page.tsx)

- Pre-populated form with default values
- Liturgical calendar integration for date selection
- Scripture reference helper

#### Edit Form ([id]/page.tsx)

- Load existing entry data
- Same form as new entry but with pre-filled values

### 2. Simplified Form Components

#### Main Form Component (lectionary-form.tsx)

```tsx
export function LectionaryForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      date: new Date().toISOString(),
      liturgicalSeason: 'Ordinary Time',
      scriptureReferences: [],
      body: '',
    }
  );

  // Form fields and handlers
  // ...

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Basic Information</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <CalendarHelper
            value={formData.date}
            onChange={date => setFormData({ ...formData, date })}
          />
        </div>

        <div className="form-group">
          <label>Liturgical Season</label>
          <select
            value={formData.liturgicalSeason}
            onChange={e => setFormData({ ...formData, liturgicalSeason: e.target.value })}
          >
            <option value="Advent">Advent</option>
            <option value="Christmas">Christmas</option>
            <option value="Epiphany">Epiphany</option>
            <option value="Lent">Lent</option>
            <option value="Easter">Easter</option>
            <option value="Pentecost">Pentecost</option>
            <option value="Ordinary Time">Ordinary Time</option>
          </select>
        </div>
      </div>

      <div className="form-section">
        <h2>Scripture Readings</h2>
        <ScriptureHelper
          references={formData.scriptureReferences}
          onChange={refs => setFormData({ ...formData, scriptureReferences: refs })}
        />
      </div>

      <div className="form-section">
        <h2>Content</h2>
        <div className="form-group">
          <label>Reflection</label>
          <textarea
            value={formData.body}
            onChange={e => setFormData({ ...formData, body: e.target.value })}
            rows={10}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
```

#### Scripture Helper (scripture-helper.tsx)

```tsx
export function ScriptureHelper({ references, onChange }) {
  const [newRef, setNewRef] = useState({ book: '', chapter: '', verses: '' });

  const addReference = () => {
    onChange([...references, newRef]);
    setNewRef({ book: '', chapter: '', verses: '' });
  };

  const removeReference = index => {
    const newRefs = [...references];
    newRefs.splice(index, 1);
    onChange(newRefs);
  };

  return (
    <div className="scripture-helper">
      <div className="existing-references">
        {references.map((ref, index) => (
          <div key={index} className="reference-item">
            <span>
              {ref.book} {ref.chapter}:{ref.verses}
            </span>
            <button type="button" onClick={() => removeReference(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="add-reference">
        <select value={newRef.book} onChange={e => setNewRef({ ...newRef, book: e.target.value })}>
          <option value="">Select Book</option>
          {/* List of Bible books */}
        </select>

        <input
          type="number"
          placeholder="Chapter"
          value={newRef.chapter}
          onChange={e => setNewRef({ ...newRef, chapter: e.target.value })}
        />

        <input
          type="text"
          placeholder="Verses (e.g., 1-5)"
          value={newRef.verses}
          onChange={e => setNewRef({ ...newRef, verses: e.target.value })}
        />

        <button type="button" onClick={addReference}>
          Add
        </button>
      </div>

      <div className="scripture-preview">{/* Preview of the selected scripture */}</div>
    </div>
  );
}
```

### 3. TinaCMS Integration

#### Client for TinaCMS (client.ts)

```typescript
import { client } from '../../tina/client';

export async function fetchLectionaryEntries() {
  try {
    const result = await client.request({
      query: queries.lectionaryConnection,
      variables: {
        first: 100,
      },
    });

    return result.data.lectionaryConnection.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Error fetching lectionary entries:', error);
    throw error;
  }
}

export async function fetchLectionaryEntry(id: string) {
  try {
    const result = await client.request({
      query: queries.lectionary,
      variables: {
        relativePath: `${id}.md`,
      },
    });

    return result.data.lectionary;
  } catch (error) {
    console.error('Error fetching lectionary entry:', error);
    throw error;
  }
}

export async function saveLectionaryEntry(data: any, id?: string) {
  try {
    // Transform data to match TinaCMS schema
    const transformedData = transformLectionaryData(data);

    // If id is provided, update existing entry, otherwise create new
    if (id) {
      // Update existing entry
      // ...
    } else {
      // Create new entry
      // ...
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving lectionary entry:', error);
    throw error;
  }
}
```

## Authentication

For simplicity, we'll use a basic authentication approach:

```typescript
// lib/lectionary-cms/auth.ts
export function isAuthenticated() {
  // Check if user is authenticated
  // For simplicity, could use a password stored in localStorage
  return localStorage.getItem('lectionary-auth') === 'true';
}

export function authenticate(password: string) {
  // Simple authentication
  if (password === process.env.LECTIONARY_ADMIN_PASSWORD) {
    localStorage.setItem('lectionary-auth', 'true');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('lectionary-auth');
}
```

## Implementation Timeline

1. **Week 1**: Set up basic admin interface and authentication
2. **Week 2**: Implement form components and helpers
3. **Week 3**: Integrate with TinaCMS backend
4. **Week 4**: Testing and refinement

## Future Enhancements

1. **Rich Text Editor**: Add a simplified rich text editor for the reflection
2. **Scripture API Integration**: Connect to a Bible API for scripture lookups
3. **Preview Mode**: Add a preview of how the lectionary will appear on the site
4. **Bulk Operations**: Add support for bulk operations (e.g., creating entries for an entire season)
5. **Collaboration**: Add support for comments and collaboration between authors
