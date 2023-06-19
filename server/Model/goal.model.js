const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
    seasonId: Schema.Types.ObjectId,
    time: Number, 
    type: String, 
    club: Schema.Types.ObjectId, 
    scoredPlayer: Schema.Types.ObjectId,
    assistedPlayer: Schema.Types.ObjectId
});

const goalModel = new mongoose.model('Goal', goalSchema, 'Goal');
module.exports = goalModel;