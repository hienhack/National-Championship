const clubModel = require('../../Model/club.model');
const playerModel = require('../../Model/player.model');
const fs = require('fs');
const path = require('path');

class ClubController {
    async createClub(req,res) {
        const club = req.body;
        club.seasons[0].players = [];

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
                console.log("Delete File successfully.");
            });
            res.status(400).send({message: "Create Club Failed", error: error});
            return;
        }
        res.status(200).send({message:"Create Club Successfully", error: error});
    }

    // add Player exists 
    async addPlayer(req, res) {
        const clubId = req.body.clubId;
        const playerId = req.body.playerId;

        // clubModel.findByIdAndUpdate(clubId, {player})
        //     .then((result) => 
        //      res.status(200).send({message:"Add Player Successfully", error: result})
        //         .catch((err) => 
        //         res.status(400).send({message:"Add Player Failed", error: err })
        //     ))
        const club = await clubModel.findById(clubId);
        club.seasons[0].players.push(playerId);
        club.save();

        res.status(200).send({message:"Add Player Successfully"});
        
    }

    async updateClub(req, res) {
        const { _id, ...update} = req.body;
        
        if(req.file){
            update.image = `Images/club/${req.file.filename}`;
            const oldClub = await clubModel.fileById(_id);
            if(oldClub != null){
                fs.unlink(path.join(__dirname,"Public",oldClub.image), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Delete Old Club's Image successfully.");
                });
            }  
        }

        const rs = await clubModel.findByIdAndUpdate(_id, update, options.new = true);
        res.status(200).send({message:"Updated Club Successfully"});
    }

    async deleteClub(req,res) {
        const clubId = req.body.clubId;

        const club = await clubModel.fileById(clubId);
        fs.unlink(path.join(__dirname,"Public",club.image), (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete Club's Image successfully.");
        });

        const rs = await clubModel.findByIdAndDelete(clubId);
        res.status(200).send({message: "Deleted Club Successfully"});
    }
     
    async deletePlayerFromClub (req, res) {
        const clubId= req.body.clubId;
        const playerId = req.body.playerId;

        const club = await clubModel.findById(clubId);
        club.seasons[0].players.pull(playerId);
        club.save();

        res.status(200).send({ message:"Deleted Player from Club Successfully"});
    }

    async getClub ( req, res) {
        const seasonId = req.params.seasonId;
        const clubId = req.params.clubId;
        const result = {};

        result = await clubModel.findById(clubId);
        if (result === null) {
            res.status(400).send({ message: "Club not found" });
            return;
        }
        // not sure it works or not
        result.find({ 
            seasons: {seasonId: seasonId}}
            // ,{
            //     "seasons.$": 1
            // }
            )
        // console.log(result);
        //
        result.seasons[0].players = result.seasons[0].players.map(async (playerId) =>{
            var player = await playerModel.findById(playerId);
            const { clubs , ...info } = player;
            return info;
        });
        res.status(200).send({message:"Showed club's infomation successfully", data: result});

    }
}

const clubController = new ClubController();
module.exports = clubController;