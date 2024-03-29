const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: String,
    image: String,
    dob: Date,
    nationality: String,
    position: String,
    seasons: [{
        _id: false,
        seasonId: Schema.Types.ObjectId,
        clubId: Schema.Types.ObjectId,
        shirtNumber: Number
    }]
});

const playerModel = mongoose.model('Player', playerSchema, 'Player');
module.exports = playerModel;