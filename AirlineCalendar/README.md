<!-- Display the saved record -->
    <template if:true={isRecordSaved}>
        <div class="slds-box slds-box_xx-small slds-text-align_center">
            <h3>Booking Confirmation:</h3>
            <p><strong>Passenger Name:</strong> {passengerName}</p>
            <p><strong>Departure Date:</strong> {departureDate}</p>
            <p><strong>Return Date:</strong> {returnDate}</p>
        </div>
    </template>



