import React from 'react';
interface TableCell {
    content: string;
    colSpan?: number;
    rowSpan?: number;
    isHeader?: boolean;
}
interface TableRow {
    cells: TableCell[];
}
interface UBTableProps {
    caption?: string;
    rows: TableRow[];
    className?: string;
}
/**
 * Component for displaying a table with support for Modern and Traditional themes
 */
export declare const UBTable: React.FC<UBTableProps>;
export default UBTable;
//# sourceMappingURL=UBTable.d.ts.map