# Data Models

This package provides shared data models for the UB Ecosystem applications.

## Installation

```bash
npm install @ub-ecosystem/data-models
```

## Usage

```typescript
import { Table, TableRow, TableCell } from "@ub-ecosystem/data-models";

// Create a table
const table: Table = {
  id: "example-table",
  title: "Example Table",
  rows: [
    {
      isHeader: true,
      cells: [
        { content: "Header 1", isHeader: true },
        { content: "Header 2", isHeader: true },
      ],
    },
    {
      cells: [{ content: "Cell 1" }, { content: "Cell 2" }],
    },
  ],
};

// Use the Grid model for CSS Grid layouts
import { Grid, GridItem } from "@ub-ecosystem/data-models";

const grid: Grid = {
  id: "example-grid",
  title: "Example Grid",
  columns: 2,
  rows: 2,
  items: [
    { id: "item-1", content: "Item 1", gridArea: "area_0_0" },
    { id: "item-2", content: "Item 2", gridArea: "area_0_1" },
    { id: "item-3", content: "Item 3", gridArea: "area_1_0" },
    { id: "item-4", content: "Item 4", gridArea: "area_1_1" },
  ],
};
```

## Models

### Table Models

#### `Table`

```typescript
interface Table {
  id: string;
  title?: string;
  description?: string;
  caption?: string;
  rows: TableRow[];
  metadata?: Record<string, any>;
}
```

#### `TableRow`

```typescript
interface TableRow {
  cells: TableCell[];
  isHeader?: boolean;
}
```

#### `TableCell`

```typescript
interface TableCell {
  content: string;
  htmlContent?: string;
  rowspan?: number;
  colspan?: number;
  isHeader?: boolean;
}
```

### Grid Models

#### `Grid`

```typescript
interface Grid {
  id: string;
  title?: string;
  description?: string;
  items: GridItem[];
  columns: number;
  rows: number;
  areas?: string[][];
  metadata?: Record<string, any>;
}
```

#### `GridItem`

```typescript
interface GridItem {
  id: string;
  content: string;
  htmlContent?: string;
  gridArea?: string;
  metadata?: Record<string, any>;
}
```

## License

MIT
