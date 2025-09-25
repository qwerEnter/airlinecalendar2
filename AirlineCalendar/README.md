sfdx force:project:create --projectname jqueryLightningDatePicker
cd jqueryLightningDatePicker
----------------------------------------------------------------------------------------------------------------------------------

sfdx force:lightning:component:create --type lwc --componentname datePickerTest --outputdir force-app/main/default/lwc

----------------------------------------------------------------------------------------------------------------------------------
<template>
    <lightning-card title="Date Picker Test">
        <div class="slds-p-around_medium">
            <!-- Passenger Name -->
            <lightning-input 
                type="text" 
                label="Departure Date" 
                value={departureDate} 
                data-id="departureDate">
            </lightning-input>
            <lightning-button label="Book Flight" onclick={handleSave}></lightning-button>
        </div>
    </lightning-card>
</template>

import { LightningElement, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import jqueryLib from '@salesforce/resourceUrl/jqueryLib';

export default class DatePickerTest extends LightningElement {
    @track departureDate = '';
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
        const depDateEl = this.template.querySelector('[data-id="departureDate"]');

        if (depDateEl) {
            $(depDateEl).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: (dateText) => {
                    this.departureDate = dateText;
                    depDateEl.value = dateText; // Manually update the input field
                    console.log('Departure selected:', dateText);
                }
            });

            console.log('✅ Datepicker initialized successfully');
        }
    }

    handleSave() {
        alert(`Booking saved! Departure Date: ${this.departureDate}`);
    }
}



.ui-datepicker {
    z-index: 9999 !important; /* Ensure date picker appears on top */
}

----------------------------------------------------------------------------------------------------------------------------------


<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>52.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightning__RecordHome</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__RecordPage">
            <objects>
                <object>*</object>
            </objects>
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>
