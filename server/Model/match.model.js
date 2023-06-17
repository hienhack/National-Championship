const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = mongoose.Schema({
    round: Number,
    datetime: Date,
    stadium: String,
    club1: {
        clubId: Schema.Types.ObjectId,
        appearances: [Schema.Types.ObjectId],
        substitutes: [Schema.Types.ObjectId],
    },
    club2: {
        clubId: Schema.Types.ObjectId,
        appearances: [Schema.Types.ObjectId],
        substitutes: [Schema.Types.ObjectId],
    },
    reuslt: String,
    goals: [Schema.Types.ObjectId],
    cards: [{
        playerId: Schema.Types.ObjectId, 
        type: String
    }]
});

const matchModel = mongoose.model('Match', matchSchema, 'Match');
module.exports = matchModel;