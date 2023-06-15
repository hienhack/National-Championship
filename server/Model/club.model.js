const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubSchema = new Schema({
    name: String,
    stadium: String,
    image: String,
    seasonID: Schema.Types.ObjectId,
    coachName: String,
    players: [Schema.Types.ObjectId]
})

const clubModel = mongoose.model('Club', clubSchema, 'Club');
module.exports = clubModel;