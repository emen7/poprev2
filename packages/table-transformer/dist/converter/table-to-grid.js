export function tableToGrid(table) {
    const items = [];
    let gridAreas = [];
    // Determine grid dimensions
    const rows = table.rows.length;
    const columns = Math.max(...table.rows.map(row => row.cells.length));
    // Create grid areas for simple mapping
    for (let i = 0; i < rows; i++) {
        const areaRow = [];
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
            if (colIndex >= columns)
                break;
            // Create grid item
            const itemId = `item_${i}_${colIndex}`;
            const item = {
                id: itemId,
                content: cell.content,
                htmlContent: cell.htmlContent,
                gridArea: gridAreas[i][colIndex]
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
        areas: gridAreas
    };
}
//# sourceMappingURL=table-to-grid.js.map