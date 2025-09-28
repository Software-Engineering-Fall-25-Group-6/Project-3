'use strict';

class TableTemplate {
    static fillIn(tableId, dict, columnName) {
        let table = document.getElementById(tableId);
        if (!table) return;

        // Process header row
        let headerRow = table.rows[0];
        let colIndex = -1;

        for (let i = 0; i < headerRow.cells.length; i++) {
            let cell = headerRow.cells[i];
            let processor = new TemplateProcessor(cell.textContent);
            cell.textContent = processor.fillIn(dict);

            if (columnName && cell.textContent === columnName) {
                colIndex = i;
            }
        }

        // If column not found, make table visible and exit
        if (columnName && colIndex === -1) {
            TableTemplate._makeVisible(table);
            return;
        }

        // Process table body
        for (let r = 1; r < table.rows.length; r++) {
            let row = table.rows[r];

            if (columnName) {
                let cell = row.cells[colIndex];
                let processor = new TemplateProcessor(cell.textContent);
                cell.textContent = processor.fillIn(dict);
            } else {
                for (let c = 0; c < row.cells.length; c++) {
                    let cell = row.cells[c];
                    let processor = new TemplateProcessor(cell.textContent);
                    cell.textContent = processor.fillIn(dict);
                }
            }
        }

        // Finally, ensure the table is visible
        TableTemplate._makeVisible(table);
    }

    // Ensure the table is visible if it was hidden
    static _makeVisible(table) {
        if (table.style.visibility === "hidden") {
            table.style.visibility = "visible";
        }
    }
}