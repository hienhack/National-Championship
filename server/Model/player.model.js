const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: String,
    image: String,
    dob: Date,
    nationality: String,
    position: String,
});

const playerModel = mongoose.model('Player', playerSchema, 'Player');
module.exports = playerModel;