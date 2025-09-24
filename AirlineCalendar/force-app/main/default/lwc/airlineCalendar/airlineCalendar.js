import { LightningElement, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import saveBooking from '@salesforce/apex/AirlineCalendarController.saveBooking';
import getBookings from '@salesforce/apex/AirlineCalendarController.getBookings';
import jqueryLib from '@salesforce/resourceUrl/jqueryLib';

export default class AirlineCalendar extends LightningElement {
    @track passengerName = '';
    @track departureDate = '';
    @track returnDate = '';
    @track bookings = [];
    isLibLoaded = false;

    renderedCallback() {
    if (this.isLibLoaded) {
        return;
    }
    this.isLibLoaded = true;

    Promise.all([
        loadScript(this, jqueryLib + '/jquery.min.js'),
        loadScript(this, jqueryLib + '/jquery-ui.min.js'),
        loadStyle(this, jqueryLib + '/jquery-ui.min.css')
    ])
    .then(() => {
        console.log('✅ jQuery and jQuery UI loaded');
        setTimeout(() => {
            this.initializeCalendar();
        }, 0); // wait for DOM
        this.loadBookings();
    })
    .catch(error => {
        console.error('❌ Error loading libraries', error);
    });
}


    initializeCalendar() {
    const $ = window.jQuery;

    const depDateEl = this.template.querySelector('[data-id="departureDate"]');
    const retDateEl = this.template.querySelector('[data-id="returnDate"]');

    if (depDateEl && retDateEl) {
        // Initialize the date pickers
        $(depDateEl).datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: (dateText) => {
                this.departureDate = dateText;
                console.log('Departure selected:', dateText);

                // Update the input field with the selected date
                depDateEl.value = dateText;  // Manually update the input value
            },
            beforeShow: function(input, inst) {
                setTimeout(() => { $(input).focus(); }, 100);
            }
        });

        $(retDateEl).datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: (dateText) => {
                this.returnDate = dateText;
                console.log('Return selected:', dateText);

                // Update the input field with the selected date
                retDateEl.value = dateText;  // Manually update the input value
            },
            beforeShow: function(input, inst) {
                setTimeout(() => { $(input).focus(); }, 100);
            }
        });

        console.log('✅ Datepickers initialized successfully');
    }
}


    handleNameChange(event) {
        this.passengerName = event.target.value;
         console.log('Passenger name:', this.passengerName);
    }

    handleSave() {
        if (!this.passengerName || !this.departureDate || !this.returnDate) {
            alert('⚠️ Please fill in all fields before booking.');
            return;
        }

        saveBooking({
            name: this.passengerName,
            departureDate: this.departureDate,
            returnDate: this.returnDate
        })
        .then(() => {
            alert('✅ Booking saved!');
            this.passengerName = '';
            this.departureDate = '';
            this.returnDate = '';

            // reset UI fields
             this.template.querySelector('lightning-input').value = '';
            const depDateEl = this.template.querySelector('[data-id="departureDate"]');
            const retDateEl = this.template.querySelector('[data-id="returnDate"]');
            const $ = window.jQuery;
            $(depDateEl).datepicker('setDate', null);
            $(retDateEl).datepicker('setDate', null);
            this.loadBookings();
        })
        .catch(error => {
            console.error(error);
            alert('❌ Error saving booking');
        });
    }

    loadBookings() {
        getBookings()
            .then(result => {
                this.bookings = result;
            })
            .catch(error => {
                console.error('Error loading bookings:', error);
            });
    }
}
