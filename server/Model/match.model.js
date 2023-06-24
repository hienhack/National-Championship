const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = mongoose.Schema({
    seasonId: Schema.Types.ObjectId,
    round: Number,
    datetime: Date,
    stadium: String,
    club1Id: Schema.Types.ObjectId,
    club2Id: Schema.Types.ObjectId,
    isPlayed: Boolean,
    result: {
        club1: Number,
        club2: Number,
    },
    goals: [Schema.Types.ObjectId],
    cards: [{
        playerId: Schema.Types.ObjectId,
        time: Number
    }]
});

const matchModel = mongoose.model('Match', matchSchema, 'Match');
module.exports = matchModel;