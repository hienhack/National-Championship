const clubModel = require('../../Model/club.model');
const playerModel = require('../../Model/player.model');
const seasonModel = require('../../Model/season.model');
const fs = require('fs');
const path = require('path');

class ClubController {
    async createClub(req,res) {
        const club = req.body;
        club.seasons = [];

        if ( req.file ){
            club.image = `Images/club/${req.file.filename}`;
        }
        const document = new clubModel(club);
        
        try {
            await document.save();
        } catch (error) {
            fs.unlink(path.join(__dirname,"Public",`Images/club/${req.file.filename}`), (err) => {
                if (err) {
                    throw err;
                }
                console.log("Deleted File successfully.");
            });
            res.status(400).send({message: "Create Club Failed"});
            return;
        }
        res.status(201).send({message:"Created Club Successfully"});
    }

    // add Player exists 
    async addPlayer(req, res) {
        const clubId = req.body.clubId;
        const playerId = req.body.playerId;
        const playerNumber = Number(req.body.playerNumber);

        const club = await clubModel.findById(clubId);
        const player = await playerModel.findById(playerId);

        for (const p of club.seasons[0].players) {
            if (playerNumber === Number(p.shirt_number)) {
                res.status(400).send({ message: "Player number already exists" });
                return;
            }
        }

        club.seasons[0].players.push({
            playerId: player._id,
            shirt_number: playerNumber
        });
        club.save();

        res.status(201).send({message:"Add Player Successfully"});
        return;
    }

    async updateClub(req, res) {
        const { _id, ...update} = req.body;
        
        if(req.file){
            update.image = `Images/club/${req.file.filename}`;
            const oldClub = await clubModel.findById(_id);
            if(oldClub != null){
                fs.unlink(path.join("Public",oldClub.image), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Delete Old Club's Image successfully.");
                });
            }  
        }

        const rs = await clubModel.findByIdAndUpdate(_id, update, {new : true});
        res.status(200).send({message:"Updated Club Successfully"});
    }

    async deleteClub(req,res) {
        const clubId = req.body.clubId;

        const club = await clubModel.findById(clubId);
        fs.unlink(path.join("Public",club.image), (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete Club's Image successfully.");
        });

        const rs = await clubModel.findByIdAndDelete(clubId);
        res.status(201).send({message: "Deleted Club Successfully"});
    }
     
    async deletePlayerFromClub (req, res) {
        const clubId= req.body.clubId;
        const playerId = req.body.playerId;
        const player = await playerModel.findById(playerId);
       
        const club = await clubModel.findByIdAndUpdate(
            clubId,
            { $pull: { 'seasons.0.players': { playerId: player._id } } },
            {new: true}
          );
        
       
       if (club){
        res.status(201).send({ message:"Deleted Player from Club Successfully"});
        return;
       }else{
        res.status(400).send({message:"Deleted Player from Club Failed"});
        return;
       }
    }

    async getClub ( req, res) {

        const seasonId = req.params.seasonId;
        const clubId = req.params.clubId;
        const season = await seasonModel.findById(seasonId);

        var result = await clubModel.findOne({_id: clubId, 'seasons.seasonId': season._id},{name: 1, stadium: 1, image: 1,'seasons.$': 1});

        if (result === null) {
            res.status(400).send({ message: "Club not found" });
            return;
        }

        var players = [];
        for (let index = 0; index < result.seasons[0].players.length; index++) {
            const p = result.seasons[0].players[index];
            const player = await playerModel.findOne({_id: p.playerId});
              
            const {seasons, ...info} = player;
            if(player){
                info._doc.shirt_number = p.shirt_number;
            } 
            players.push(info._doc);
        }
        res.status(200).send({message:"Showed club's infomation successfully", data: result,players});

    }
}

const clubController = new ClubController();
module.exports = clubController;