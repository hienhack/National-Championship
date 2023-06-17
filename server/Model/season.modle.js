const mongoose = require('mongoose');
const { Schema } = mongoose;

const seasonSchema = new Schema({
    seasonName: String,
    yearStart: Number,
    yearEnd: Number,
    rule: {
        demotedPosition: Number,
        minAge: Number,
        redCardBanned: Number,
        totalClubs: Number,
        maxForeignPlayer: Number,
        maxClubPlayer: Number
    },
    clubs: [Schema.Types.ObjectId]
});

const seasonModel = mongoose.model('Season', seasonSchema, 'Season');
module.exports = seasonModel;