const playerModel = require('../../Model/player.model');
const goalModel = require('../../Model/goal.model');
const seasonModel = require('../../Model/season.model');
const clubModel = require('../../Model/club.model');
const fs = require('fs');

class PlayerController {
    async playerDetail(req, res) {
        const playerId = req.params.playerId;

        const doc = await playerModel.findOne({ _id: playerId });
        const player = doc.toObject();
        if (!player) {
            res.status(400).send({ message: "Player not found" });
            return;
        }

        player.seasons = await Promise.all(player.seasons.map(async elem => {
            const seasonId = elem.seasonId;
            const clubId = elem.clubId;

            let goal = await goalModel.count({ seasonId: seasonId, scoredPlayer: player._id });
            let assist = await goalModel.count({ seasonId: seasonId, assistedPlayer: player._id });

            let club = await clubModel.findOne({ _id: clubId }).select("_id name image");
            let season = await seasonModel.findOne({ _id: seasonId }).select("year");

            return {
                year: season.year,
                club: club,
                goal: goal,
                assist: assist
            };
        }));

        res.status(200).send({ message: "success", data: player });
    }

    async getAllPlayer(req, res) {
        const key = req.query.key;
        const seasonId = req.query.seasonId;

        const pattern = key == null ? /\w+/ : key;
        const regex = new RegExp(pattern);
        let filter = { "name": { $regex: regex, $options: 'i' } };

        let players = [];
        try {
            if (seasonId) {
                players = await playerModel.find(filter).elemMatch("seasons", { seasonId: req.query.seasonId })
                    .select('_id name dob image nationality position');

            } else {
                players = await playerModel.find(filter).select('_id name dob image nationality position');
            }
        } catch (error) {
            // Do nothing
        }
        res.status(200).send({ message: "success", data: players });
    }

    async create(req, res) {
        let { clubId, seasonId, shirtNumber, ...player } = req.body;

        const image = req.file.filename;
        player.image = image ? `/Images/player/${image}` : "";

        try {
            const doc = new playerModel(player);
            doc.seasons.push({ seasonId: seasonId, clubId: clubId, shirtNumber: shirtNumber });




            // To do
            // Add this player to club
            const club = await clubModel.findOne({ _id: clubId });
            const season = await seasonModel.findOne({ _id: seasonId });

            const dob = new Date(player.dob);
            const dobYear = dob.getFullYear();
            const currTime = new Date();
            const currYear = currTime.getFullYear();
            const old = currYear - dobYear;
            if(old<Number(season.rule.minAge)){
                if (image) {
                    fs.unlink(`Public${player.image}`, (err) => { });
                }
                res.status(400).send({ message: "The player's old less than age of season" });
                return;
            }

            const playerNumber = Number(shirtNumber);
            for (let index = 0; index < club.seasons.length; index++) {
                if (club.seasons[index].seasonId.equals(seasonId)) {
                    if (club.seasons[index].players.length === season.rule.maxClubPlayer) {
                        if (image) {
                            fs.unlink(`Public${player.image}`, (err) => { });
                        }
                        res.status(400).send({ message: "Max club players" });
                        return;
                    }

                    for (const p of club.seasons[index].players) {
                        if (playerNumber === Number(p.shirt_number)) {
                            if (image) {
                                fs.unlink(`Public${player.image}`, (err) => { });
                            }
                            res.status(400).send({ message: "Player number already exists" });
                            return;
                        }
                        if (doc._id.equals(p.playerId)) {
                            if (image) {
                                fs.unlink(`Public${player.image}`, (err) => { });
                            }
                            res.status(400).send({ message: "Player already exists" });
                            return;
                        }
                    }

                    club.seasons[index].players.push({
                        playerId: doc._id,
                        shirt_number: playerNumber
                    });
                    doc.save();
                    club.save();
                    res.status(201).send({ message: "Add Player Successfully" });
                    return;
                }
            }
            if (image) {
                fs.unlink(`Public${player.image}`, (err) => { });
            }
            res.status(400).send({ message: "Season Not Found" });
            return;

        } catch (error) {
            if (image) {
                fs.unlink(`Public${player.image}`, (err) => { });
            }
            res.status(500).send({ message: "Unable to create" });
            return;
        }
    }

    async update(req, res) {
        const { _id, ...updated } = req.body;
        if (req.file) {
            updated.image = `/Images/player/${req.file.filename}`;
        }

        const oldPlayer = await playerModel.findOneAndUpdate({ _id: _id }, updated, { returnDocument: "before" });
        if (req.file) {
            fs.unlink(`Public${oldPlayer.image}`, (err) => {
                console.log(err);
            });
        }

        res.status(200).send({ message: "Updated successfully" });
    }

    async delete(req, res) {
        const playerId = req.body.playerId;
        const seasonId = req.body.seasonId;

        const player = await playerModel.findById(playerId);
        if (player == null) {
            res.status(400).send({ message: "Player not found" });
            return;
        }

        if (player.image !== "") {
            fs.unlink(`Public${player.image}`, (err) => { });
        }
        var clubId = null;
        for (let index = 0; index < player.seasons.length; index++) {
            if (player.seasons[index].seasonId.equals(seasonId)) {
                clubId = player.seasons[index].clubId;
            }
        }
        if (clubId === null) {
            res.status(400).send({ message: "Season Not Found" });
            return;
        }
        // To do
        // Delete from the club
        const club = await clubModel.findOne({ _id: clubId });

        for (let index = 0; index < club.seasons.length; index++) {
            if (club.seasons[index].seasonId.equals(seasonId)) {
                club.seasons[index].players.pull({ playerId: playerId });
                club.save();
                await playerModel.deleteOne({ _id: playerId });
                res.status(200).send({ message: "Deleted successfully" });
                return;
            }
        }
        res.status(400).send({ message: "Season Not Found" });
        return;
    }
}

const playerController = new PlayerController();
module.exports = playerController;
