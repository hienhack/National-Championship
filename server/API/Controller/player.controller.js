const playerModel = require('../../Model/player.model');
const goalModel = require('../../Model/goal.model');
const seasonModel = require('../../Model/season.model');
const clubModel = require('../../Model/club.model');
const fs = require('fs');

const message = {
    REGISTERED_PLAYER: "registered player",
    MAXIMUM_PLAYER_REACHED: "maximum players reached",
    MAXIMUM_FOREIGNER_REACHED: "maximum foreign players reached",
    // DUPLICATED_SHIRTNUMBER: "dublicated shirt number",
    SASTIFIED: "sastified"
}

async function registerChecking(player, clubId, seasonId, shirtNumber) {
    const totalPlayer = playerModel.find().byClub(clubId).count();
    const foreignPlayer = playerModel.find().byClub(clubId).byNationality("foreigner").count();
    const season = seasonModel.findById(seasonId).exec();

    if (totalPlayer == season.rule.maxClubPlayer) {
        return message.MAXIMUM_PLAYER_REACHED;
    } else if (foreignPlayer == season.rule.maxForeignPlayer) {
        return message.MAXIMUM_FOREIGNER_REACHED;
    } else if (player._id) {
        try {
            const registered = await this.findById(player._id).bySeason(seasonId).exec();
            return message.REGISTERED_PLAYER;
        } catch (ignore) { }
    }

    return message.SASTIFIED;
}

class PlayerController {
    async playerDetail(req, res) {
        try {
            const playerId = req.params.playerId;
            let doc = await playerModel.findOne({ _id: playerId });
            if (!doc) {
                res.status(400).send({ message: "player not found" });
                return;
            }

            const player = doc.toObject();
            player.seasons = await Promise.all(player.seasons.map(async elem => {
                const { seasonId, clubId } = elem;
                const goal = await goalModel.count({ seasonId: seasonId, scoredPlayer: player._id });
                const assist = await goalModel.count({ seasonId: seasonId, assistedPlayer: player._id });
                const club = await clubModel.findOne({ _id: clubId }).select("_id name image");
                const season = await seasonModel.findOne({ _id: seasonId }).select("year");

                return { year: season.year, club: club, goal: goal, assist: assist };
            }));

            res.status(200).send({ message: "success", data: player });
        } catch (error) {
            res.status(400).send({ message: error.message });
            return;
        }
    }

    async getAllPlayer(req, res) {
        const key = req.query.key;
        const seasonId = req.query.seasonId;

        try {
            const players = await playerModel.find().byName(key).bySeason(seasonId)
                .select('_id name image dob nationality position');
            res.status(200).send({ message: "success", data: players });
        } catch (error) {
            console.log("An error happened");
            res.status(200).send({ message: "success", data: [] });
        }
    }

    async register(req, res) {
        const { playerId, clubId, seasonId, shirtNumber } = req.body;

        const checkMessage = await registerChecking({ _id: playerId }, clubId, seasonId, shirtNumber);
        if (checkMessage != message.SASTIFIED) {
            res.status(400).send({ message: checkMessage });
        }

        try {
            const rs = await playerModel.register(playerId, seasonId, clubId, shirtNumber);
            res.status(200).send({ message: "success" });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async create(req, res) {
        if (!req.file) {
            res.status(400).send({ message: "image is required" });
            return;
        }

        const { clubId, seasonId, shirtNumber, ...player } = req.body;

        let message = await registerChecking(player, clubId, seasonId, shirtNumber);
        if (message != message.SASTIFIED) {
            res.status(400).send({ message: message });
        }

        player.image = image ? `/Images/player/${req.file.filename}` : "";

        registerChecking(player, clubId, seasonId, shirtNumber);

        try {
            const doc = await playerModel.create(player);
            await playerModel.register(doc._id, seasonId, clubId, shirtNumber);

            res.status(201).send({ message: "success", data: doc._id });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async update(req, res) {
        const { _id, ...updated } = req.body;
        if (req.file) {
            updated.image = `/Images/player/${req.file.filename}`;
        }

        try {
            const oldPlayer = await playerModel.findOneAndUpdate({ _id: _id }, updated, { returnDocument: "before" });
            if (req.file) {
                fs.unlink(`Public${oldPlayer.image}`, (err) => { });
            }
            res.status(200).send({ message: "success" });
        } catch (error) {
            res.status(400).sedn({ message: error.message });
        }

    }

    async delete(req, res) {
        const { playerId, seasonId } = req.body;

        try {
            const updated = await playerModel.cancelRegis(playerId, seasonId);
            if (updated.seasons.length == 0) {
                await playerModel.deleteOne({ _id: playerId });

                if (updated.image != "") {
                    fs.unlink(`Public${updated.image}`, (err) => { });
                }
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }

        res.status(200).send({ message: "success" });
    }
}

const playerController = new PlayerController();
module.exports = playerController;