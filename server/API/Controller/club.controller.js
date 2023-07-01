const clubModel = require('../../Model/club.model');
const playerModel = require('../../Model/player.model');
const seasonModel = require('../../Model/season.model');
const fs = require('fs');
const path = require('path');

class ClubController {

    async createClub(req, res) {
        const club = req.body;

        club.seasons = [];
        club.seasons.push({
            seasonId: req.body.seasonId,
            coachName: req.body.coachName
        })

        const season = await seasonModel.findOne({ _id: req.body.seasonId });

        if (season.clubs.length === season.rule.totalClubs) {
            res.status(400).send({ message: "Max number of club" });
            return;
        }
        if (req.file) {
            club.image = `Images/club/${req.file.filename}`;
        }
        const document = new clubModel(club);

        try {
            await document.save();

            season.clubs.push(document._id);
            season.save();
        } catch (error) {
            fs.unlink(path.join(__dirname, "Public", `Images/club/${req.file.filename}`), (err) => {
                if (err) {
                    throw err;
                }
                console.log("Deleted File successfully.");
            });
            res.status(400).send({ message: "Create Club Failed" });
            return;
        }
        res.status(201).send({ message: "Created Club Successfully" });
    }

    async updateClub(req, res) {
        const { _id, ...update } = req.body;

        if (req.file) {
            update.image = `Images/club/${req.file.filename}`;
            const oldClub = await clubModel.findById(_id);
            if (oldClub != null) {
                fs.unlink(path.join("Public", oldClub.image), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Delete Old Club's Image successfully.");
                });
            }
        }

        const rs = await clubModel.findByIdAndUpdate(_id, update);
        res.status(200).send({ message: "Updated Club Successfully" });
    }

    async deleteClub(req, res) {
        const clubId = req.body.clubId;
        const seasonId = req.body.seasonId;

        const club = await clubModel.findById(clubId);
        const season = await seasonModel.findById(seasonId);

        var size = club.seasons.length;
        for (let index = 0; index < club.seasons.length; index++) {
            if (club.seasons[index].seasonId.equals(seasonId)) {
                season.clubs.pull(clubId);
                size -= 1;
                if (size === 0) {
                    fs.unlink(path.join("Public", club.image), (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Delete Club's Image successfully.");
                    });

                    const rs = await clubModel.findByIdAndDelete(clubId);
                    season.save();
                    res.status(201).send({ message: "Deleted Club in complete Successfully" });
                    return;
                } else {
                    club.seasons.pull({ seasonId: club.seasons[index].seasonId });
                    season.save();
                    club.save();
                    res.status(201).send({ message: "Deleted Club in season Successfully" });
                    return;
                }

            }
        }

        res.status(400).send({ message: "Season Not Found" });
        return;
    }

    //chua xoa duoc 2 player
    async deletePlayerFromClub(req, res) {
        const { _id, season } = req.body;
        const club = await clubModel.findById(_id);
        for (let index = 0; index < club.seasons.length; index++) {
            if (club.seasons[index].seasonId.equals(season.seasonId)) {
                for (let i = 0; i < season.playersId.length; i++) {
                    const Id = season.playersId[i];
                    club.seasons[index].players.pull({ playerId: Id })
                }
            }
        }
        club.save();
        res.status(201).send({ message: "Deleted Player from Club Successfully" });
        return;
    }

    async getClub(req, res) {

        const seasonId = req.params.seasonId;
        const clubId = req.params.clubId;

        const club = await clubModel.findById(clubId);
        var data = new Object();
        const size = club.seasons.length;
        for (let i = 0; i < size; i++) {
            if (club.seasons[i].seasonId.equals(seasonId)) {
                data._id = club._id;
                data.name = club.name;
                data.stadium = club.stadium;
                data.image = club.image;
                data.season = {};
                data.season.seasonId = club.seasons[i].seasonId;
                data.season.coachName = club.seasons[i].coachName;
                data.season.playerList = [];
                for (let index = 0; index < club.seasons[i].players.length; index++) {
                    const p = club.seasons[i].players[index];

                    const player = await playerModel.findOne({ _id: p.playerId }).lean();

                    if (player) {
                        delete player.seasons;
                        player.shirt_number = p.shirt_number;
                    }
                    data.season.playerList.push(player);
                }
                res.status(200).send({ message: "Showed club's infomation successfully", data: data });
                return;
            }

        }
        res.status(400).send({ message: "Club not found" });
        return;

    }

    async findClub(req, res) {
        const { name, seasonId } = req.query;
        var queries = {};

        if (name) {
            queries.name = { $regex: name, $options: 'i' }
        }
        if (seasonId) {
            queries['seasons.seasonId'] = seasonId;
        }

        const clubs = await clubModel.find(queries).select('_id name image');

        res.status(200).send({ message: "Success", data: clubs });
        return;
    }
}

const clubController = new ClubController();
module.exports = clubController;
