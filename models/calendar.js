const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    creationDate: {
        type: Date,
        required: [true, 'Creation date field is required.']
    }
});

// Mongoose will pluralize the name and create a new collection.
const Calendar = mongoose.model('calendar', CalendarSchema);

module.exports = Calendar;