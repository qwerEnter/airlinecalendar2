import { LightningElement, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import jqueryLib from '@salesforce/resourceUrl/jqueryLib';

export default class AirlineCalendar extends LightningElement {
    @track passengerName = '';
    @track departureDate = '';
    @track returnDate = '';
    isLibLoaded = false;

    renderedCallback() {
        if (this.isLibLoaded) {
            return;
        }
        this.isLibLoaded = true;

        // Load jQuery and jQuery UI
        Promise.all([
            loadScript(this, jqueryLib + '/jquery.min.js'),
            loadScript(this, jqueryLib + '/jquery-ui.min.js'),
            loadStyle(this, jqueryLib + '/jquery-ui.min.css')
        ])
        .then(() => {
            console.log('✅ jQuery and jQuery UI loaded');
            this.initializeCalendar();
        })
        .catch(error => {
            console.error('❌ Error loading libraries', error);
        });
    }

    initializeCalendar() {
        const $ = window.jQuery;

        // Query for the date picker elements
        const depDateEl = this.template.querySelector('[data-id="departureDate"]');
        const retDateEl = this.template.querySelector('[data-id="returnDate"]');

        // Initialize date pickers if elements exist
        if (depDateEl && retDateEl) {
            $(depDateEl).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: (dateText) => {
                    this.departureDate = dateText;
                    depDateEl.value = dateText;  // Manually update the input field
                    console.log('Departure selected:', dateText);
                },
                beforeShow: function(input, inst) {
                    setTimeout(() => { $(input).focus(); }, 100); // Ensure focus
                }
            });

            $(retDateEl).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: (dateText) => {
                    this.returnDate = dateText;
                    retDateEl.value = dateText;  // Manually update the input field
                    console.log('Return selected:', dateText);
                },
                beforeShow: function(input, inst) {
                    setTimeout(() => { $(input).focus(); }, 100); // Ensure focus
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
        alert('✅ Booking saved!');
    }
}
