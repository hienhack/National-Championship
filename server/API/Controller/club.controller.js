const clubModel = require('../../Model/club.model');
const playerModel = require('../../Model/player.model');
const seasonModel = require('../../Model/season.model');
const fs = require('fs');
const path = require('path');

class ClubController {

    async createClub(req, res) {
        const club = req.body;
        console.log(req.body);
        console.log(req.file);

        club.seasons = [];
        club.seasons.push({
            seasonId: req.body.seasonId,
            coachName: req.body.coachName
        })
        if (req.file) {
            club.image = `Images/club/${req.file.filename}`;
        }
        const document = new clubModel(club);

        try {
            await document.save();
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

    // add Player exists 
    async addPlayer(req, res) {
        const seasonId = req.body.seasonId;
        const clubId = req.body.clubId;
        const playerId = req.body.playerId;
        const playerNumber = Number(req.body.playerNumber);

        const club = await clubModel.findById(clubId);
        const player = await playerModel.findById(playerId);

        for (let index = 0; index < club.seasons.length; index++) {
            if (club.seasons[index].seasonId.equals(seasonId)) {
                for (const p of club.seasons[index].players) {
                    if (playerNumber === Number(p.shirt_number)) {
                        res.status(400).send({ message: "Player number already exists" });
                        return;
                    }
                    if (player._id.equals(p.playerId)) {
                        res.status(400).send({ message: "Player already exists" });
                        return;
                    }
                }

                club.seasons[index].players.push({
                    playerId: player._id,
                    shirt_number: playerNumber
                });

                try {
                    player.seasons.push({
                        seasonId: seasonId,
                        clubId: clubId
                    })
                    player.save();
                    club.save();
                    res.status(201).send({ message: "Add Player Successfully" });
                    return;

                } catch (error) {
                    res.status(400).send({ message: "Add Player Failed" });
                    return;
                }
            }
        }
        res.status(400).send({ message: "Season Not Found" });
        return;


    }
    // async addPlayer(req, res) {
    //     const seasonId = req.body.seasonId;
    //     const clubId = req.body.clubId;
    //     const playerId = req.body.playerId;
    //     const playerNumber = Number(req.body.playerNumber);

    //     const club = await clubModel.findOne({_id: clubId, "seasons.seasonId": seasonId});
    //     const player = await playerModel.findById(playerId);

    //     if(club === null){
    //         res.status(400).send({message: "Season Not Found"});
    //         return;
    //     }

    //     for (const p of club.seasons[0].players) {
    //         if (playerNumber === Number(p.shirt_number)) {
    //             res.status(400).send({ message: "Player number already exists" });
    //             return;
    //         }
    //         if(player._id.equals(p.playerId)) {
    //             res.status(400).send({ message: "Player already exists" });
    //             return;
    //         }
    //     }

    //     club.seasons[0].players.push({
    //         playerId: player._id,
    //         shirt_number: playerNumber
    //     });
    //     try {
    //         player.seasons.push({
    //             seasonId: seasonId,
    //             clubId: clubId
    //         })
    //         player.save();
    //         club.save();
    //         res.status(201).send({message:"Add Player Successfully"});
    //         return;

    //     } catch (error) {
    //         res.status(400).send({message:"Add Player Failed"});
    //         return;
    //     }

    // }

    // async updateClub1(req, res) {
    //     console.log(1);
    //     const { _id, ...update} = req.body;
    //     update['seasons.coachName'] = update.season.coachName;
    //     console.log(update);
    //     //const oldClub = await clubModel.findOne({_id: _id, "seasons.seasonId": update.season.seasonId});
    //     // if(req.file){
    //     //     update.image = `Images/club/${req.file.filename}`;

    //     //     if(oldClub != null){
    //     //         fs.unlink(path.join("Public",oldClub.image), (err) => {
    //     //             if (err) {
    //     //                 throw err;
    //     //             }
    //     //             console.log("Delete Old Club's Image successfully.");
    //     //         });
    //     //     }  
    //     // }
    //     await clubModel.findOneAndUpdate({_id: _id, "seasons.seasonId": update.season.seasonId},update, {new: true}); 
    //     // console.log(update);
    //     // console.log(oldClub);
    //     // const rs = await clubModel.findByIdAndUpdate(_id, update, {new : true});

    //     res.status(200).send({message:"Updated Club Successfully"});
    // }

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

        const rs = await clubModel.findByIdAndUpdate(_id, update, { new: true });
        res.status(200).send({ message: "Updated Club Successfully" });
    }

    async deleteClub(req, res) {
        const clubId = req.body.clubId;
        const seasonId = req.body.seasonId;
        console.log(clubId);
        const club = await clubModel.findById(clubId);
        console.log(club);

        var size = club.seasons.length;
        for (let index = 0; index < club.seasons.length; index++) {
            if (club.seasons[index].seasonId.equals(seasonId)) {
                size -= 1;
                if (size === 0) {
                    fs.unlink(path.join("Public", club.image), (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Delete Club's Image successfully.");
                    });

                    const rs = await clubModel.findByIdAndDelete(clubId);
                    res.status(201).send({ message: "Deleted Club in complete Successfully" });
                    return;
                } else {
                    club.seasons.pull({ seasonId: club.seasons[index].seasonId });
                    club.save();
                }
                res.status(201).send({ message: "Deleted Club in season Successfully" });
                return;
            }
        }

        res.status(400).send({ message: "Season Not Found" });
        return;
        // if(club === null){
        //     res.status(400).send({message: "Season Not Found"});
        //     return;
        // }
        // delete club.seasons[0];
        // const afterClub = await clubModel.findById(clubId);
        // if ( afterClub.seasons === null ){
        //     fs.unlink(path.join("Public",club.image), (err) => {
        //         if (err) {
        //             throw err;
        //         }
        //         console.log("Delete Club's Image successfully.");
        //     });

        //     const rs = await clubModel.findByIdAndDelete(clubId);
        //     res.status(201).send({message: "Deleted Club Successfully"});
        // }
    }

    // async deleteClub(req,res) {
    //     const clubId = req.body.clubId;

    //     const club = await clubModel.findById(clubId);
    //     fs.unlink(path.join("Public",club.image), (err) => {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log("Delete Club's Image successfully.");
    //     });

    //     const rs = await clubModel.findByIdAndDelete(clubId);
    //     res.status(201).send({message: "Deleted Club Successfully"});
    // }

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
        res.status(201).send({ message: "Deleted Player from Club Successfully" });
        return;



        // const clubId = req.body.clubId;
        // const playerId = req.body.playerId;
        // const player = await playerModel.findById(playerId);

        // const club = await clubModel.findByIdAndUpdate(
        //     clubId,
        //     { $pull: { 'seasons.0.players': { playerId: player._id } } },
        //     { new: true }
        // );


        // if (club) {
        // res.status(201).send({ message: "Deleted Player from Club Successfully" });
        // return;
        // } else {
        //     res.status(400).send({ message: "Deleted Player from Club Failed" });
        //     return;
        // }
    }

    // async getClub(req, res) {

    //     const seasonId = req.params.seasonId;
    //     const clubId = req.params.clubId;
    //     const season = await seasonModel.findById(seasonId);

    //     var result = await clubModel.findOne({ _id: clubId, 'seasons.seasonId': season._id }, { _id: 1, name: 1, stadium: 1, image: 1, 'seasons.$': 1 }).lean();
    //     if (result === null) {
    //         res.status(400).send({ message: "Club not found" });
    //         return;
    //     }

    //     result.seasons[0].playerList = [];

    //     for (let index = 0; index < result.seasons[0].players.length; index++) {
    //         const p = result.seasons[0].players[index];

    //         const player = await playerModel.findOne({ _id: p.playerId }).lean();

    //         if (player) {
    //             delete player.seasons;
    //             player.shirt_number = p.shirt_number;
    //         }
    //         result.seasons[0].playerList.push(player);
    //     }
    //     delete result.seasons[0].players;
    //     res.status(200).send({ message: "Showed club's infomation successfully", data: result });

    // }

    async getClub(req, res) {

        const seasonId = req.params.seasonId;
        const clubId = req.params.clubId;
        // const season = await seasonModel.findById(seasonId);

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

        // result.seasons[0].playerList = [];

        // for (let index = 0; index < result.seasons[0].players.length; index++) {
        //     const p = result.seasons[0].players[index];

        //     const player = await playerModel.findOne({ _id: p.playerId }).lean();

        //     if (player) {
        //         delete player.seasons;
        //         player.shirt_number = p.shirt_number;
        //     }
        //     result.seasons[0].playerList.push(player);
        // }
        // delete result.seasons[0].players;
        // res.status(200).send({ message: "Showed club's infomation successfully", data: result });

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
        console.log(queries);

        const clubs = await clubModel.find(queries).select('_id name image');

        res.status(200).send({ message: "Success", data: clubs });
        return;
    }
}

const clubController = new ClubController();
module.exports = clubController;
