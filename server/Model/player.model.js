const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: String,
    image: String,
    dob: Date,
    nationality: String,
    position: String,
    seasons: [{
        _id: false,
        seasonId: Schema.Types.ObjectId,
        clubId: Schema.Types.ObjectId,
        shirtNumber: Number
    }]
});

playerSchema.query.byName = function (name) {
    return name ? this.where({ name: new RegExp(name, 'i') }) : this;
}

playerSchema.query.bySeason = function (seasonId) {
    return seasonId ? this.elemMatch('seasons', { seasonId: seasonId }) : this;
}

playerSchema.query.byClub = function (clubId) {
    return clubId ? this.elemMatch('seasons', { clubId: clubId }) : this;
}

playerSchema.query.byNationality = function (type) {
    if (type === "vietnamese") {
        return this.where({ nationality: "Việt Nam" });
    } else if (type === "foreigner") {
        return this.where("nationality").ne("Việt Nam");
    }
}

playerSchema.statics.register = async function (playerId, seasonId, clubId, shirtNumber) {
    return this.updateOne({ _id: playerId },
        { $push: { seasons: { clubId: clubId, seasonId: seasonId, shirtNumber: shirtNumber } } });
}

playerSchema.statics.cancelRegis = async function (playerId, seasonId) {
    return this.findOneAndUpdate({ _id: playerId }, { $pull: { seasons: { seasonId: seasonId } } }, { new: true });
}

const playerModel = mongoose.model('Player', playerSchema, 'Player');
module.exports = playerModel;