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
        _id: false,
        club1: Number,
        club2: Number,
    },
    goals: [Schema.Types.ObjectId],
    cards: [{
        club: Number, // Nếu thẻ của clb 1 thì là số 1, 2 thì là số 2
        playerId: Schema.Types.ObjectId,
        time: Number
    }]
});

const matchModel = mongoose.model('Match', matchSchema, 'Match');
module.exports = matchModel;