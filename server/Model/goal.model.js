const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
    seasonId: Schema.Types.ObjectId,
    time: Number, 
    type: String, 
    clubId: Schema.Types.ObjectId, 
    scoredPlayerId: Schema.Types.ObjectId,
    assistedPlayerId: Schema.Types.ObjectId
});

const goalModel = new mongoose.model('Goal', goalSchema, 'Goal');
module.exports = goalModel;