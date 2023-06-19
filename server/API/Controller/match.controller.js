const clubModel = require('../../Model/club.model');

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
    }
}