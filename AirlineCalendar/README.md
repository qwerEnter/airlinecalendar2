 handleSave() {
        // Validation
        const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

        // Validate departure date: should be today or later
        if (this.departureDate < today) {
            alert('⚠️ Departure date cannot be before today.');
            return;
        }

        // Validate return date: should be the same or later than departure date
        if (this.returnDate < this.departureDate) {
            alert('⚠️ Return date cannot be before departure date.');
            return;
        }

        // Log the values before saving to check if passengerName is being passed
        console.log('Saving booking:', this.passengerName, this.departureDate, this.returnDate);

        // Validate inputs before saving the booking
        if (!this.passengerName || !this.departureDate || !this.returnDate) {
            alert('⚠️ Please fill in all fields before booking.');
            return;
        }
