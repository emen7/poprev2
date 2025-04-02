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
//# sourceMappingURL=table.d.ts.map