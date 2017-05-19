var mongoose = require("mongoose");
mongoose.connect("mongodb://techUser1:Z=BHT/jEpOLtA()>E-nu<a*q=jcqJVq}@cluster0-shard-00-00-eatwn.mongodb.net:27017,cluster0-shard-00-01-eatwn.mongodb.net:27017,cluster0-shard-00-02-eatwn.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

var mongoSchema = mongoose.Schema;

var eventSchema = {
    "calendarId" : Number,
    "id" : Number,
    "date" : Date,
    "title" : String,
    "description" : String,
    "location" : String
};

module.exports = mongoose.model('events', eventSchema);