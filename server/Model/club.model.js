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
            shirtNumber: Number,
            playerId: Schema.Types.ObjectId
        }]
    }]
})

const clubModel = mongoose.model('Club', clubSchema, 'Club');
module.exports = clubModel;