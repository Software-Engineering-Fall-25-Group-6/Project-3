'use strict';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.date = null;
        this.callback = callback;
    }

    render(dateObject){
        this.date = {
            month: dateObject.getMonth() + 1,
            day: dateObject.getDate(),
            year: dateObject.getFullYear()
        };

        const targetDiv = document.getElementById(this.id);
        if(!targetDiv) {
            console.error(`Element with id ${this.id} not found.`);
            return;
        }
        targetDiv.innerHTML = '';
        const dateDisplay = document.createElement('div');
        dateDisplay.textContent = `Selected Date: ${this.date.month}/${this.date.day}/${this.date.year}`;
        targetDiv.appendChild(dateDisplay);

        targetDiv.innerHTML = dateObject.toDateString();
    }
}