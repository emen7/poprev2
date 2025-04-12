# Table Transformer

This package provides utilities for transforming HTML tables into structured data models and alternative representations like CSS Grid layouts.

## Installation

```bash
npm install @ub-ecosystem/table-transformer
```

## Dependencies

This package requires the following dependencies:

- `cheerio`: For parsing HTML
- `@ub-ecosystem/data-models`: For shared data models

## Usage

### Parsing HTML Tables

```typescript
import { parseHtmlTable } from '@ub-ecosystem/table-transformer';

// HTML table string
const htmlTable = `
<table>
  <caption>Example Table</caption>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
    <tr>
      <td>Cell 3</td>
      <td>Cell 4</td>
    </tr>
  </tbody>
</table>
`;

// Parse the HTML table into a structured Table object
const table = parseHtmlTable(htmlTable, 'example-table');

console.log(table);
```

### Converting Tables to Grid Layouts

```typescript
import { parseHtmlTable, tableToGrid } from '@ub-ecosystem/table-transformer';
import { Table } from '@ub-ecosystem/data-models';

// Parse an HTML table
const table = parseHtmlTable(htmlTable, 'example-table');

// Convert the table to a grid layout
const grid = tableToGrid(table);

console.log(grid);
```

## API

### `parseHtmlTable(html: string, id: string): Table`

Parses an HTML table string into a structured `Table` object.

- `html`: The HTML string containing a table element
- `id`: A unique identifier for the table
- Returns: A `Table` object representing the parsed table

### `tableToGrid(table: Table): Grid`

Converts a `Table` object to a `Grid` object suitable for CSS Grid layouts.

- `table`: The `Table` object to convert
- Returns: A `Grid` object representing the table as a grid layout

## Data Models

This package uses the following data models from `@ub-ecosystem/data-models`:

- `Table`: Represents a table with rows and cells
- `TableRow`: Represents a row in a table
- `TableCell`: Represents a cell in a table
- `Grid`: Represents a grid layout
- `GridItem`: Represents an item in a grid layout

## License

MIT
