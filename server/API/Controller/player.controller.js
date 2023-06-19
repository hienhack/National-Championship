const playerModel = require('../../Model/player.model');
const goalModel = require('../../Model/goal.model');
const seasonModel = require('../../Model/season.model');
const clubModel = require('../../Model/club.model');
const fs = require('fs');

class PlayerController {
    async playerDetail(req, res) {
        const playerId = req.params.playerId;
        
        const player = await playerModel.findById(playerId).exec();
        if (!player) {
            res.status(400).send({ message: "Player not found" });
            return;
        }

        // Make a statistic 
        player.seasons = player.seasons.map(async elem => {
            const seasonId = elem.seasonId;
            const clubId = elem.clubId;

            let goal = await goalModel.count({ seasonId: seasonId, scoredPlayer: player._id });
            let assist = await goalModel.count({ seasonId: seasonId, assistedPlayer: player._id });

            let club = await clubModel.findById(clubId).select("_id name");
            let season = await seasonModel.findById(seasonId).select("yearStart yearEnd");

            return {
                year: `${season.yearStart}-${season.yearEnd}`,
                club: club,
                goal: goal,
                assist: assist
            };
        });

        res.status(200).send({ message: "success", data: player });
    }

    async getAllPlayer(req, res) {
        const key = req.query.key;
        const pattern = key == null ? /\w+/ : key;
        const regex = new RegExp(pattern);

        const players = await playerModel.find({ "name" : { $regex: regex, $options: 'i' }})
            .select('_id name dob image nationality position');
        
        res.status(200).send({ message: "success", data: players });
    }

    async create(req, res) {
        const player = req.body;
        player.seasons = [];
        const image = req.file.filename;
        player.image = image ? `/Images/player/${image}`: "";
        
        try {
            const doc = new playerModel(player);
            await doc.save();
        } catch (error) {
            if (image) {
                fs.unlink(`Public${player.image}`, (err) => { });
            }
            res.status(500).send({ message: "Unable to create" });
            return;
        }

        res.status(200).send({ message: "Created successfully" });
    }

    async update(req, res) {
        const { _id, ...updated } = req.body;
        const image = req.file.filename;
        if (image) {
            updated.image = `/Images/player/${image}`;
        }

        const oldPlayer = await playerModel.findOneAndUpdate({ _id: _id }, updated, { returnDocument: "before" });
        if (oldPlayer.image != "") {
            fs.unlink(`Public${oldPlayer.image}`, (err) => {
                console.log(err);
            });
        }

        res.status(200).send({ message: "Updated successfully" });
    }

    async delete(req, res) {
        const playerId = req.body.playerId;
        
        const player = await playerModel.findById(playerId);
        if (player == null) {
            res.status(400).send({ message: "Player not found" });
            return;
        }

        if (player.image !== "") {
            fs.unlink(`Public${player.image}`, (err) => {});
        }
        
        await playerModel.deleteOne({ _id: playerId });
        res.status(200).send({ message: "Deleted successfully" });
    }
}   

const playerController = new PlayerController();
module.exports = playerController;