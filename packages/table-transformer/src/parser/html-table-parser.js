import * as cheerio from 'cheerio';
export function parseHtmlTable(html, id) {
    const $ = cheerio.load(html);
    const tableElement = $('table');
    // Extract caption/title
    const caption = tableElement.find('caption').text().trim();
    // Extract rows
    const rows = [];
    // Process thead if exists
    tableElement.find('thead tr').each((i, rowEl) => {
        const cells = [];
        $(rowEl)
            .find('th, td')
            .each((j, cellEl) => {
            const $cell = $(cellEl);
            cells.push({
                content: $cell.text().trim(),
                htmlContent: $cell.html() || undefined,
                rowspan: $cell.attr('rowspan') ? parseInt($cell.attr('rowspan') || '1', 10) : undefined,
                colspan: $cell.attr('colspan') ? parseInt($cell.attr('colspan') || '1', 10) : undefined,
                isHeader: cellEl.name === 'th',
            });
        });
        rows.push({
            cells,
            isHeader: true,
        });
    });
    // Process tbody
    tableElement.find('tbody tr').each((i, rowEl) => {
        const cells = [];
        $(rowEl)
            .find('th, td')
            .each((j, cellEl) => {
            const $cell = $(cellEl);
            cells.push({
                content: $cell.text().trim(),
                htmlContent: $cell.html() || undefined,
                rowspan: $cell.attr('rowspan') ? parseInt($cell.attr('rowspan') || '1', 10) : undefined,
                colspan: $cell.attr('colspan') ? parseInt($cell.attr('colspan') || '1', 10) : undefined,
                isHeader: cellEl.name === 'th',
            });
        });
        rows.push({
            cells,
            isHeader: false,
        });
    });
    // If no thead/tbody structure, process rows directly
    if (rows.length === 0) {
        tableElement.find('tr').each((i, rowEl) => {
            const cells = [];
            $(rowEl)
                .find('th, td')
                .each((j, cellEl) => {
                const $cell = $(cellEl);
                cells.push({
                    content: $cell.text().trim(),
                    htmlContent: $cell.html() || undefined,
                    rowspan: $cell.attr('rowspan') ? parseInt($cell.attr('rowspan') || '1', 10) : undefined,
                    colspan: $cell.attr('colspan') ? parseInt($cell.attr('colspan') || '1', 10) : undefined,
                    isHeader: cellEl.name === 'th',
                });
            });
            rows.push({
                cells,
                isHeader: i === 0 && $(rowEl).find('th').length > 0,
            });
        });
    }
    return {
        id,
        caption,
        rows,
    };
}
//# sourceMappingURL=html-table-parser.js.map