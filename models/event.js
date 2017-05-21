const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema  = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    description: {
        type: String,
        required: [false]
    },
    date: {
        type: Date,
        required: [true, 'Date field is required.']
    },
    location: {
        type: String,
        required: [false]
    },
    calendarId: {
        type: String,
        required: [true, 'CalendarId field is required.']
    }
});

// Mongoose will pluralize the name and create a new collection.
const Event = mongoose.model('event', EventSchema);

module.exports = Event;