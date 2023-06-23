const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = mongoose.Schema({
    seasonId: Schema.Types.ObjectId,
    round: Number,
    datetime: Date,
    stadium: String,
    club1: {
        clubId: Schema.Types.ObjectId,
        name: String,
        appearances: [Schema.Types.ObjectId],
        substitutes: [Schema.Types.ObjectId],
    },
    club2: {
        clubId: Schema.Types.ObjectId,
        name: String,
        appearances: [Schema.Types.ObjectId],
        substitutes: [Schema.Types.ObjectId],
    },
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

matchSchema.methods.addGoal = (goal) => {
    if (goal.club == club1) {
        this.result.club1++;
    } else if (goal.club == club2) {
        this.result.club2++;
    } else {
        throw new Error("Invalid scored club");
        return;
    }

    this.goals.push(goal._id);
}

matchSchema.methods.addCard = (card) => {
    this.cards.push(card);
}

const matchModel = mongoose.model('Match', matchSchema, 'Match');
module.exports = matchModel;