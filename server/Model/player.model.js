const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: String,
    image: String,
    dob: Date,
    nationality: String,
    position: String,
    clubs: [{
        seasonId: Schema.Types.ObjectId,
        clubId: Schema.Types.ObjectId
    }]
});

const playerModel = mongoose.model('Player', playerSchema, 'Player');
module.exports = playerModel;