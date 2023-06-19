const clubModel = require('../../Model/club.model');
const matchModel = require('../../Model/match.model');
class MatchController {
    async createMatch(req,res){
        const match = req.body;
        const club1 = await clubModel.findById(match.clubId1);
        match.stadium = club1.stadium;
        match.club1.clubId = match.clubId1;
        match.club1.appearances = [];
        match.club1.substitutes = [];
        match.club2.clubId = match.clubId2;
        match.club2.appearances = [];
        match.club2.substitutes = [];
        match.result = "";
        match.goals = [];
        match.cards = [];

        const doc = new matchModel(match);

        try {
            await doc.save();
        } catch (error) {
            res.status(400).send({message: "Created Match Failed"});
            return;
        }
        res.status(200).send({message: "Created Match Success"});
        return;
    }

    async addGoal(req,res){
        
    }
}