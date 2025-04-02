# Almanac Integration Implementation Plan

This document outlines the detailed implementation plan for integrating the almanac into the UB Ecosystem monorepo. It includes specific steps, technologies, code examples, and a timeline for the integration.

## 1. Project Setup and Infrastructure

### 1.1 Monorepo Structure Updates (Week 1)

```
ub-ecosystem/
├── apps/
│   ├── reader/                 # Existing UB Reader application
│   ├── almanac/                # New Almanac application
│   └── publications/           # Existing Publications application
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── content-transformer/    # Content transformation system
│   ├── table-transformer/      # HTML table transformation
│   ├── reference-parser/       # UB reference parsing and linking
│   └── data-models/            # Shared data models and types
├── content/                    # Content directory
└── config/                     # Shared configuration
```

### 1.2 Package Configuration (Week 1)

Create the necessary package.json files for new packages:

**packages/table-transformer/package.json**

```json
{
  "name": "@ub-ecosystem/table-transformer",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --dts",
    "dev": "tsup src/index.ts --dts --watch",
    "lint": "eslint src/**/*.ts",
    "test": "jest"
  },
  "dependencies": {
    "cheerio": "^1.0.0-rc.12",
    "@ub-ecosystem/data-models": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "tsup": "^6.7.0",
    "jest": "^29.5.0",
    "@types/jest": "^29.5.1"
  }
}
```

**apps/almanac/package.json**

```json
{
  "name": "@ub-ecosystem/almanac",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",
    "start": "next start -p 3002",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^13.4.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@ub-ecosystem/ui": "workspace:*",
    "@ub-ecosystem/table-transformer": "workspace:*",
    "@ub-ecosystem/reference-parser": "workspace:*",
    "@ub-ecosystem/data-models": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "eslint": "^8.40.0",
    "eslint-config-next": "^13.4.1"
  }
}
```

### 1.3 Domain Configuration (Week 1)

Create a domain configuration file to manage the multi-domain setup:

**packages/config/src/domains.ts**

```typescript
export type AppDomain = "reader" | "almanac" | "publications" | "lectionary";

export interface DomainConfig {
  subdomain: string;
  port: number;
  title: string;
  description: string;
}

export const domains: Record<AppDomain, DomainConfig> = {
  reader: {
    subdomain: "reader",
    port: 3001,
    title: "UB Reader",
    description: "Read The Urantia Book online",
  },
  almanac: {
    subdomain: "almanac",
    port: 3002,
    title: "Master Universe Almanac",
    description: "Explore the cosmology and personalities of the Urantia Book",
  },
  publications: {
    subdomain: "publications",
    port: 3000,
    title: "UB Publications",
    description: "Publications and articles related to The Urantia Book",
  },
  lectionary: {
    subdomain: "lectionary",
    port: 3003,
    title: "UB Lectionary",
    description: "Lectionary readings from The Urantia Book",
  },
};

export function getDomainUrl(
  domain: AppDomain,
  isProduction = process.env.NODE_ENV === "production"
): string {
  const config = domains[domain];

  if (isProduction) {
    return `https://${config.subdomain}.masteruniverse.org`;
  }

  return `http://localhost:${config.port}`;
}
```

## 2. Data Models and Transformation

### 2.1 Table Data Models (Week 2)

Create TypeScript interfaces for table data:

**packages/data-models/src/table.ts**

```typescript
export interface TableCell {
  content: string;
  htmlContent?: string;
  rowspan?: number;
  colspan?: number;
  isHeader?: boolean;
}

export interface TableRow {
  cells: TableCell[];
  isHeader?: boolean;
}

export interface Table {
  id: string;
  title?: string;
  description?: string;
  caption?: string;
  rows: TableRow[];
  metadata?: Record<string, any>;
}

export interface GridItem {
  id: string;
  content: string;
  htmlContent?: string;
  gridArea?: string;
  metadata?: Record<string, any>;
}

export interface Grid {
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

### 2.2 HTML Table Parser (Week 2-3)

Create a parser to extract data from HTML tables:

**packages/table-transformer/src/parser/html-table-parser.ts**

```typescript
import * as cheerio from "cheerio";
import { Table, TableRow, TableCell } from "@ub-ecosystem/data-models";

export function parseHtmlTable(html: string, id: string): Table {
  const $ = cheerio.load(html);
  const tableElement = $("table");

  // Extract caption/title
  const caption = tableElement.find("caption").text().trim();

  // Extract rows
  const rows: TableRow[] = [];

  // Process thead if exists
  tableElement.find("thead tr").each((i, rowEl) => {
    const cells: TableCell[] = [];

    $(rowEl)
      .find("th, td")
      .each((j, cellEl) => {
        const $cell = $(cellEl);
        cells.push({
          content: $cell.text().trim(),
          htmlContent: $cell.html() || undefined,
          rowspan: $cell.attr("rowspan")
            ? parseInt($cell.attr("rowspan") || "1", 10)
            : undefined,
          colspan: $cell.attr("colspan")
            ? parseInt($cell.attr("colspan") || "1", 10)
            : undefined,
          isHeader: cellEl.name === "th",
        });
      });

    rows.push({
      cells,
      isHeader: true,
    });
  });

  // Process tbody
  tableElement.find("tbody tr").each((i, rowEl) => {
    const cells: TableCell[] = [];

    $(rowEl)
      .find("th, td")
      .each((j, cellEl) => {
        const $cell = $(cellEl);
        cells.push({
          content: $cell.text().trim(),
          htmlContent: $cell.html() || undefined,
          rowspan: $cell.attr("rowspan")
            ? parseInt($cell.attr("rowspan") || "1", 10)
            : undefined,
          colspan: $cell.attr("colspan")
            ? parseInt($cell.attr("colspan") || "1", 10)
            : undefined,
          isHeader: cellEl.name === "th",
        });
      });

    rows.push({
      cells,
      isHeader: false,
    });
  });

  // If no thead/tbody structure, process rows directly
  if (rows.length === 0) {
    tableElement.find("tr").each((i, rowEl) => {
      const cells: TableCell[] = [];

      $(rowEl)
        .find("th, td")
        .each((j, cellEl) => {
          const $cell = $(cellEl);
          cells.push({
            content: $cell.text().trim(),
            htmlContent: $cell.html() || undefined,
            rowspan: $cell.attr("rowspan")
              ? parseInt($cell.attr("rowspan") || "1", 10)
              : undefined,
            colspan: $cell.attr("colspan")
              ? parseInt($cell.attr("colspan") || "1", 10)
              : undefined,
            isHeader: cellEl.name === "th",
          });
        });

      rows.push({
        cells,
        isHeader: i === 0 && $(rowEl).find("th").length > 0,
      });
    });
  }

  return {
    id,
    caption,
    rows,
  };
}
```

### 2.3 Table to Grid Converter (Week 3)

Create a utility to convert tables to grid layouts when appropriate:

**packages/table-transformer/src/converter/table-to-grid.ts**

```typescript
import { Table, Grid, GridItem } from "@ub-ecosystem/data-models";

export function tableToGrid(table: Table): Grid {
  const items: GridItem[] = [];
  let gridAreas: string[][] = [];

  // Determine grid dimensions
  const rows = table.rows.length;
  const columns = Math.max(...table.rows.map((row) => row.cells.length));

  // Create grid areas for simple mapping
  for (let i = 0; i < rows; i++) {
    const areaRow: string[] = [];
    for (let j = 0; j < columns; j++) {
      const areaName = `area_${i}_${j}`;
      areaRow.push(areaName);
    }
    gridAreas.push(areaRow);
  }

  // Create grid items from table cells
  for (let i = 0; i < rows; i++) {
    const row = table.rows[i];
    let colIndex = 0;

    for (let j = 0; j < row.cells.length; j++) {
      const cell = row.cells[j];

      // Skip positions that are covered by rowspan/colspan
      while (gridAreas[i][colIndex] === null && colIndex < columns) {
        colIndex++;
      }

      if (colIndex >= columns) break;

      // Create grid item
      const itemId = `item_${i}_${colIndex}`;
      const item: GridItem = {
        id: itemId,
        content: cell.content,
        htmlContent: cell.htmlContent,
        gridArea: gridAreas[i][colIndex],
      };

      items.push(item);

      // Handle colspan
      const colspan = cell.colspan || 1;
      const rowspan = cell.rowspan || 1;

      // Mark spanned areas as used
      if (colspan > 1 || rowspan > 1) {
        for (let r = 0; r < rowspan; r++) {
          for (let c = 0; c < colspan; c++) {
            if (i + r < rows && colIndex + c < columns && r + c > 0) {
              gridAreas[i + r][colIndex + c] = gridAreas[i][colIndex];
            }
          }
        }
      }

      colIndex++;
    }
  }

  return {
    id: `grid-${table.id}`,
    title: table.title,
    description: table.description,
    items,
    columns,
    rows,
    areas: gridAreas,
  };
}
```

## 3. UI Components

### 3.1 Accessible Data Table Component (Week 4)

Create an accessible table component:

**packages/ui/src/tables/DataTable.tsx**

```tsx
import React from "react";
import { Table } from "@ub-ecosystem/data-models";

interface DataTableProps {
  table: Table;
  className?: string;
  responsive?: boolean;
}

export function DataTable({
  table,
  className = "",
  responsive = true,
}: DataTableProps) {
  return (
    <div
      className={`ub-table-container ${
        responsive ? "ub-table-responsive" : ""
      } ${className}`}
    >
      {table.caption && <div className="ub-table-caption">{table.caption}</div>}

      <table className="ub-data-table">
        {table.rows.some((row) => row.isHeader) && (
          <thead>
            {table.rows
              .filter((row) => row.isHeader)
              .map((row, rowIndex) => (
                <tr key={`header-row-${rowIndex}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <th
                      key={`header-cell-${rowIndex}-${cellIndex}`}
                      rowSpan={cell.rowspan}
                      colSpan={cell.colspan}
                      scope={
                        cell.rowspan && cell.rowspan > 1 ? "rowgroup" : "col"
                      }
                    >
                      {cell.htmlContent ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: cell.htmlContent }}
                        />
                      ) : (
                        cell.content
                      )}
                    </th>
                  ))}
                </tr>
              ))}
          </thead>
        )}

        <tbody>
          {table.rows
            .filter((row) => !row.isHeader)
            .map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.cells.map((cell, cellIndex) =>
                  cell.isHeader ? (
                    <th
                      key={`cell-${rowIndex}-${cellIndex}`}
                      rowSpan={cell.rowspan}
                      colSpan={cell.colspan}
                      scope="row"
                    >
                      {cell.htmlContent ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: cell.htmlContent }}
                        />
                      ) : (
                        cell.content
                      )}
                    </th>
                  ) : (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      rowSpan={cell.rowspan}
                      colSpan={cell.colspan}
                    >
                      {cell.htmlContent ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: cell.htmlContent }}
                        />
                      ) : (
                        cell.content
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 3.2 Grid Layout Component (Week 4)

Create a grid layout component for content that's visually tabular but semantically not a table:

**packages/ui/src/tables/GridLayout.tsx**

```tsx
import React from "react";
import { Grid } from "@ub-ecosystem/data-models";

interface GridLayoutProps {
  grid: Grid;
  className?: string;
}

export function GridLayout({ grid, className = "" }: GridLayoutProps) {
  // Generate CSS grid template
  const gridTemplateAreas = grid.areas
    ? grid.areas.map((row) => `"${row.join(" ")}"`).join(" ")
    : undefined;

  const gridTemplateColumns = `repeat(${grid.columns}, 1fr)`;
  const gridTemplateRows = `repeat(${grid.rows}, auto)`;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns,
    gridTemplateRows,
    ...(gridTemplateAreas ? { gridTemplateAreas } : {}),
  };

  return (
    <div className={`ub-grid-container ${className}`}>
      {grid.title && <div className="ub-grid-title">{grid.title}</div>}

      {grid.description && (
        <div className="ub-grid-description">{grid.description}</div>
      )}

      <div className="ub-grid-layout" style={gridStyle}>
        {grid.items.map((item) => (
          <div
            key={item.id}
            className="ub-grid-item"
            style={{ gridArea: item.gridArea }}
          >
            {item.htmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: item.htmlContent }} />
            ) : (
              item.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3.3 Table Card Component (Week 5)

Create a card component for displaying tables:

**packages/ui/src/cards/TableCard.tsx**

```tsx
import React from "react";
import { Table, Grid } from "@ub-ecosystem/data-models";
import { DataTable } from "../tables/DataTable";
import { GridLayout } from "../tables/GridLayout";

interface TableCardProps {
  title: string;
  description?: string;
  data: Table | Grid;
  className?: string;
  useGrid?: boolean;
}

export function TableCard({
  title,
  description,
  data,
  className = "",
  useGrid = false,
}: TableCardProps) {
  // Determine if we're dealing with a Table or Grid
  const isTable = "rows" in data;

  return (
    <div className={`ub-card ub-table-card ${className}`}>
      <div className="ub-card-header">
        <h3 className="ub-card-title">{title}</h3>
        {description && (
          <div className="ub-card-description">{description}</div>
        )}
      </div>

      <div className="ub-card-content">
        {isTable ? (
          useGrid ? (
            <GridLayout grid={tableToGrid(data as Table)} />
          ) : (
            <DataTable table={data as Table} />
          )
        ) : (
          <GridLayout grid={data as Grid} />
        )}
      </div>

      <div className="ub-card-footer">{/* Optional footer content */}</div>
    </div>
  );
}

// Helper function to convert Table to Grid (simplified version)
function tableToGrid(table: Table): Grid {
  // This is a simplified version - use the actual converter from table-transformer
  return {
    id: `grid-${table.id}`,
    title: table.title,
    description: table.description,
    items: table.rows.flatMap((row, i) =>
      row.cells.map((cell, j) => ({
        id: `item-${i}-${j}`,
        content: cell.content,
        htmlContent: cell.htmlContent,
        gridArea: `area-${i}-${j}`,
      }))
    ),
    columns: Math.max(...table.rows.map((row) => row.cells.length)),
    rows: table.rows.length,
  };
}
```

## 4. Almanac Application

### 4.1 Almanac App Structure (Week 6)

Set up the basic Next.js app structure:

**apps/almanac/app/layout.tsx**

```tsx
import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { getDomainUrl } from "@ub-ecosystem/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Master Universe Almanac",
  description: "Explore the cosmology and personalities of the Urantia Book",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="ub-header">
          <div className="ub-container">
            <div className="ub-header-content">
              <div className="ub-logo">
                <Link href="/">Master Universe Almanac</Link>
              </div>

              <nav className="ub-main-nav">
                <ul>
                  <li>
                    <Link href="/cosmology">Cosmology</Link>
                  </li>
                  <li>
                    <Link href="/personalities">Personalities</Link>
                  </li>
                  <li>
                    <Link href="/lists">Lists</Link>
                  </li>
                  <li>
                    <Link href="/charts">Charts</Link>
                  </li>
                </ul>
              </nav>

              <nav className="ub-ecosystem-nav">
                <ul>
                  <li>
                    <a href={getDomainUrl("reader")}>UB Reader</a>
                  </li>
                  <li>
                    <a href={getDomainUrl("publications")}>Publications</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="ub-main">{children}</main>

        <footer className="ub-footer">
          <div className="ub-container">
            <div className="ub-footer-content">
              <p>&copy; {new Date().getFullYear()} Master Universe Almanac</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

### 4.2 Almanac Home Page (Week 6)

Create the home page for the almanac:

**apps/almanac/app/page.tsx**

```tsx
import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="ub-container">
      <section className="ub-hero">
        <h1>Master Universe Almanac</h1>
        <p className="ub-lead">
          Explore the cosmology, personalities, and concepts of The Urantia Book
        </p>
      </section>

      <section className="ub-card-grid">
        <div className="ub-card">
          <div className="ub-card-header">
            <h2 className="ub-card-title">Cosmology</h2>
          </div>
          <div className="ub-card-content">
            <p>
              Explore the structure of the universes, from Paradise to the outer
              space levels.
            </p>
          </div>
          <div className="ub-card-footer">
            <Link href="/cosmology" className="ub-button">
              Explore Cosmology
            </Link>
          </div>
        </div>

        <div className="ub-card">
          <div className="ub-card-header">
            <h2 className="ub-card-title">Personalities</h2>
          </div>
          <div className="ub-card-content">
            <p>
              Learn about the diverse personalities that inhabit the grand
              universe.
            </p>
          </div>
          <div className="ub-card-footer">
            <Link href="/personalities" className="ub-button">
              Explore Personalities
            </Link>
          </div>
        </div>

        <div className="ub-card">
          <div className="ub-card-header">
            <h2 className="ub-card-title">Lists</h2>
          </div>
          <div className="ub-card-content">
            <p>
              Browse comprehensive lists of concepts, beings, and locations.
            </p>
          </div>
          <div className="ub-card-footer">
            <Link href="/lists" className="ub-button">
              Browse Lists
            </Link>
          </div>
        </div>

        <div className="ub-card">
          <div className="ub-card-header">
            <h2 className="ub-card-title">Charts</h2>
          </div>
          <div className="ub-card-content">
            <p>
              Visualize relationships and hierarchies through detailed charts.
            </p>
          </div>
          <div className="ub-card-footer">
            <Link href="/charts" className="ub-button">
              View Charts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

## 5. Implementation Timeline

### Phase 1: Foundation (Weeks 1-3)

- Set up monorepo structure
- Create package configurations
- Implement data models
- Develop table transformation utilities

### Phase 2: UI Components (Weeks 4-5)

- Create accessible table components
- Develop grid layout components
- Build card components
- Implement responsive design system

### Phase 3: Almanac App (Weeks 6-8)

- Set up Next.js app structure
- Create main pages and navigation
- Implement content migration
- Connect to data sources

### Phase 4: Integration (Weeks 9-10)

- Link almanac with reader app
- Implement cross-references
- Set up multi-domain configuration
- Deploy to staging environment

### Phase 5: Testing and Refinement (Weeks 11-12)

- Conduct accessibility testing
- Perform cross-browser testing
- Optimize performance
- Refine user experience

## 6. Conclusion

This implementation plan provides a detailed roadmap for integrating the almanac into the UB Ecosystem monorepo. By following this plan, we will create a modern, accessible, and responsive almanac application that seamlessly integrates with the reader app and other components of the ecosystem.

The key features of this implementation include:

- Transformation of HTML tables to accessible, responsive components
- Card-based content architecture for flexibility and consistency
- Multi-domain support for the masteruniverse.org ecosystem
- Shared packages for code reuse and maintainability
- TypeScript for type safety and developer experience

This approach will ensure that the almanac is not only a valuable resource for users but also a maintainable and extensible part of the UB Ecosystem.
