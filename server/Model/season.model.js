const mongoose = require('mongoose');
const { Schema } = mongoose;

const seasonSchema = new Schema({
    seasonName: String,
    year: Number,
    start: Date,
    end: Date,
    rule: {
        demotedPosition: Number,
        minAge: Number,
        redCardBanned: Number,
        totalClubs: Number,
        maxForeignPlayer: Number,
        maxClubPlayer: Number
    }
});

const seasonModel = mongoose.model('Season', seasonSchema, 'Season');
module.exports = seasonModel;