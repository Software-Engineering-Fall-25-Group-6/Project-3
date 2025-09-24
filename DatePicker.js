'use strict';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.date = null;
        this.callback = callback;
    }

    render(dateObject){
        //Set up the local date object
        this.date = {
            month: dateObject.getMonth() + 1,
            day: dateObject.getDate(),
            year: dateObject.getFullYear()
        };

        //Get the target div
        const targetDiv = document.getElementById(this.id);
        if(!targetDiv) {
            console.error(`Element with id ${this.id} not found.`);
            return;
        }
        targetDiv.className = 'datePicker';

        //Clear it out
        targetDiv.innerHTML = '';



        //Top row for month/year and next/prev buttons
        const header = document.createElement('div');
        header.className = 'header';

        const prevMonButton = document.createElement('div');
        prevMonButton.className = 'nav-button';
        prevMonButton.textContent = '<';
        prevMonButton.addEventListener('click', () => this.render(new Date(this.date.year, this.date.month - 2, 1)));

        const nextMonButton = document.createElement('div');
        nextMonButton.className = 'nav-button';
        nextMonButton.textContent = '>';
        nextMonButton.addEventListener('click', () => this.render(new Date(this.date.year, this.date.month, 1)));

        const prevYearButton = document.createElement('div');
        prevYearButton.className = 'nav-button';
        prevYearButton.textContent = '<<';
        prevYearButton.addEventListener('click', () => this.render(new Date(this.date.year - 1, this.date.month - 1, 1)));

        const nextYearButton = document.createElement('div');
        nextYearButton.className = 'nav-button';
        nextYearButton.textContent = '>>';
        nextYearButton.addEventListener('click', () => this.render(new Date(this.date.year + 1, this.date.month - 1, 1)));

        const monthYear = document.createElement('span');
        monthYear.textContent = new Date(this.date.year, this.date.month - 1).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

        //Add the buttons and month/year to the header
        header.appendChild(prevYearButton);
        header.appendChild(prevMonButton);
        header.appendChild(monthYear);
        header.appendChild(nextMonButton);
        header.appendChild(nextYearButton);

        //Add the header to the DOM
        targetDiv.appendChild(header);



        //Days of the week row
        const daysRow = document.createElement('div');
        daysRow.className = 'daysRow';
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for(const day of daysOfWeek) {
            const dayCell = document.createElement('div');
            dayCell.className = 'dayOfWeek';
            dayCell.textContent = day;
            daysRow.appendChild(dayCell);
        }

        targetDiv.appendChild(daysRow);

        //Days of the month grid
        const daysGrid = document.createElement('div');
        daysGrid.className = 'daysGrid';

        const firstDay = new Date(this.date.year, this.date.month - 1, 1);
        const lastDay = new Date(this.date.year, this.date.month, 0);
        const startDayOfWeek = firstDay.getDay();
        const totalDays = lastDay.getDate();


        //Empty Cells
        for(let i = 0; i < startDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'datepicker-day';
            daysGrid.appendChild(emptyCell);
        }

        //Day Cells
        for(let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'datepicker-day';
            dayCell.textContent = day;
            dayCell.addEventListener('click', () => {
                if(this.callback) {
                    if (typeof this.callback === 'function' && this.date) {
                        this.callback(this.id, {
                            month: this.date.month,
                            day: day,
                            year: this.date.year,
                        });
                    }
                }
            });
            daysGrid.appendChild(dayCell);
        }

        targetDiv.appendChild(daysGrid);



    }
}