const matchModel = require('../../Model/match.model');
const clubModel = require('../../Model/club.model');
const goalModel = require('../../Model/goal.model');

class MatchController {
    async matchDetail(req, res) {
        const matchId = req.params.matchId;

        const match = await matchModel.findById(matchId);
        if (match == null) {
            res.status(400).send({message: "Match not found"});
            return;
        }

        const club1 = await clubModel.findById(match.club1.clubId);
        const club2 = await clubModel.findById(match.club2.clubId);

        // Find the starting and substitute players of these two clubs,
        // each player has shirt number, name, _id. type=app -> starting player, type=sub -> substitude player
        // Example
        // match.club1.players = [
        //    {_id: "asdfad345", name: "asdfsda", shirtNumber: 9, type: app}
        //    {_id: "a43454545", name: "asdf adf a", shirtNumber: 10, type: sub}
        // ]
        

        // Lấy thông tin các bàn thắng. Sử dụng goalModel, id các bàn thắng, type, time của bàn thắng giữ nguyên
        // example:
        // match.goals = [ 
        //      {club: 1, time: 30, type: "p", scoredPlayer: "adfads", assistedPlayer: "adfads" }
        // ]


        // response data example: 
        // data: {
        //     _id: ... ,
        //     round: 12,
        //     stadium: "Hang day",
        //     datetime: ... ,
        //     club1: {
        //            clubId: ... ,
        //            players: [
        //                  {...}
        //            ]
        //      },
        //      result: {
        //          club1: 2
        //          club2: 3
        //      },
        //      club2: ... ,
        //      goals: ... ,
        //      cards: ... ,
        // }
        

        res.status(200).send({ message: "success", data: match });
    }

    async getAll(req, res) {
        const { round, seasonId, clubId } = req.query;

        // Tìm tất cả các trận đấu có round và seasonId hoặc clubId
        // Vì là query nên có thể có field = null

        // res.status(200).send({ message: "success", data: match });
    }

    async create(req, res) {
        const match = req.body;
        match.goals = [];
        match.cards = [];
        match.result = {club};

        try {
            const doc = new matchModel(match);
            doc.save();
        } catch (error) {
            res.status(400).send({ message: "Unable to create" });
        }

        res.status(200).send({ message: "Created successfully" });
    }

    async update(req, res) {
        const { _id, ...updated } = req.body;

        await matchModel.findOneAndUpdate({ _id: _id }, updated);
        res.status(200).send({ message: "Updated successfully" });
    }

    async delete(req, res) {
        const matchId = req.body.matchId;
        
        matchId.deleteOne({ _id: matchId });
        res.status(200).send({ message: "Deleted successfully" });
    }

    async addGoal(req, res) {
        const { matchId, goal } = req.body;
        
        const match = await matchModel.findById(matchId).exec();
        if (!match) {
            res.status(400).send({ message: "Match not found" });
            return;
        }

        try {
            const goalDoc = new goalModel(goal);
            goalDoc.save();

            console.log(goalDoc._id);

            match.addGoal(goalDoc);
            match.save();

        } catch(error) {
            res.status(400).send({ message: "Unable to add goal" });
        }
    }

    async addGoal(req, res) {
        const { matchId, goal } = req.body;
        
        const match = await matchModel.findById(matchId).exec();
        if (!match) {
            res.status(400).send({ message: "Match not found" });
            return;
        }

        try {
            const goalDoc = new goalModel(goal);
            goalDoc.save();

            console.log(goalDoc._id);

            match.addGoal(goalDoc);
            match.save();

        } catch(error) {
            res.status(400).send({ message: "Unable to add goal" });
        }
    }

    async addCard(req, res) {
        const { matchId, card } = req.body;
        
        const match = await matchModel.findById(matchId).exec();
        if (!match) {
            res.status(400).send({ message: "Match not found" });
            return;
        }

        try {
            match.addGoal(card);
            match.save();
        } catch(error) {
            res.status(400).send({ message: "Unable to add goal" });
        }
    }
}

const matchController = new MatchController();
module.exports = matchController;