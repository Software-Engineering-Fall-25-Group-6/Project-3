'use strict';

class TableTemplate {
    static fillIn(tableId, dict, columnName) {
        const table = document.getElementById(tableId);
        if (!table) return;

        // Process header row
        const headerRow = table.rows[0];
        let colIndex = -1;

        for (let i = 0; i < headerRow.cells.length; i++) {
            const cell = headerRow.cells[i];
            const processor = new TemplateProcessor(cell.textContent);
            cell.textContent = processor.fillIn(dict);

            if (columnName && cell.textContent === columnName) {
                colIndex = i;
            }
        }

        // If column not found, make table visible and exit
        if (columnName && colIndex === -1) {
            TableTemplate.makeVisible(table);
            return;
        }

        // Process table body
        for (let r = 1; r < table.rows.length; r++) {
            const row = table.rows[r];

            if (columnName) {
                const cell = row.cells[colIndex];
                const processor = new TemplateProcessor(cell.textContent);
                cell.textContent = processor.fillIn(dict);
            } else {
                for (let c = 0; c < row.cells.length; c++) {
                    const cell = row.cells[c];
                    const processor = new TemplateProcessor(cell.textContent);
                    cell.textContent = processor.fillIn(dict);
                }
            }
        }

        // Finally, ensure the table is visible
        TableTemplate.makeVisible(table);
    }

    // Ensure the table is visible if it was hidden
    static makeVisible(table) {
        if (table.style.visibility === "hidden") {
            table.style.visibility = "visible";
        }
    }
}