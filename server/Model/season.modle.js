const mongoose = require('mongoose');
const { Schema } = mongoose;

const seasonSchema = new Schema({
    seasonName: String,
    year: String,
    image: String,
    rule: {
        demotedPosition: Number,
        minAge: Number,
        redCardBanned: Number,
        totalClubs: Number,
        maxForeignPlayer: Number
    }
});

const seasonModel = mongoose.model('Season', seasonSchema, 'Season');
module.exports = seasonModel;