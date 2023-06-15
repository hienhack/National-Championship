const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    seasonId: mongoose.Types.ObjectId,
    matches: [{ 
        matchDay: Number,
        match: [mongoose.Types.ObjectId] 
    }]
});

const scheduleModel = mongoose.model('Schedule', scheduleSchema, 'Schedule');
module.exports = scheduleModel;