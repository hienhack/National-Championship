const { Int32 } = require('bson');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubSchema = new Schema({
    name: String,
    stadium: String,
    image: String,
    seasons: [{
        seasonId: Schema.Types.ObjectId,
        coachName: String,
        players: [{
            _id: false,
            playerId: Schema.Types.ObjectId,
            shirt_number: Number
        }]
    }]
})

const clubModel = mongoose.model('Club', clubSchema, 'Club');
module.exports = clubModel;