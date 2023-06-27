const matchModel = require('../../Model/match.model');
const clubModel = require('../../Model/club.model');
const goalModel = require('../../Model/goal.model');
const playerModel = require('../../Model/player.model');
class MatchController {

    async matchDetail(req, res) {
        const matchId = req.params.matchId;

        const match = await matchModel.findById(matchId).lean();
        if (match == null) {
            res.status(400).send({ message: "Match not found" });
            return;
        }

        const club1 = await clubModel.findById(match.club1Id);
        const club2 = await clubModel.findById(match.club2Id);
        match.club1 = {
            _id: match.club1Id,
            name: club1.name,
            image: club1.image
        };
        match.club2 = {
            _id: match.club2Id,
            name: club2.name,
            image: club2.image
        };
        // Find the starting and substitute players of these two clubs,
        // each player has shirt number, name, _id. type=app -> starting player, type=sub -> substitude player
        // Example
        // match.club1.players = [
        //    {playerId: "asdfad345", name: "asdfsda", shirtNumber: 9, type: app}
        //    {playerId: "a43454545", name: "asdf adf a", shirtNumber: 10, type: sub}
        // ]

        // async function listPlayers(listId, listPlayer){
        //     var list = [];
        //     for (let i = 0; i < listId.length; i++) {
        //         const id = listId[i];
        //         const player = await playerModel.findById(id);
        //         const {name, ...data} = player;

        //         var rs = new Object();
        //         for (let index = 0; index < listPlayer.length; index++) {
        //             const p = listPlayer[index];

        //             if (player._id.equals(p.playerId)) {
        //                 rs.playerId = p.playerId;
        //                 rs.shirt_number = p.shirt_number;
        //                 break;
        //             }
        //         }
        //         if(rs) {
        //             rs.name = name;
        //         }

        //         list.push(rs);
        //     }
        //     return list;
        // }

        // match.club1.players = await listPlayers(match.club1.appearances,club1.seasons[0].players);

        // match.club2.players = await listPlayers(match.club2.appearances,club2.seasons[0].players);


        // Lấy thông tin các bàn thắng. Sử dụng goalModel, id các bàn thắng, type, time của bàn thắng giữ nguyên
        // example:
        // match.goals = [ 
        //      {club: 1, time: 30, type: "p", scoredPlayer: "adfads", assistedPlayer: "adfads" }
        // ]
        match.goals = await Promise.all(match.goals.map(async id => {
            const goal = await goalModel.findById(id);
            var rs = new Object();
            rs._id = goal._id;
            rs.time = goal.time;
            rs.type = goal.type;
            const clubGoal = await clubModel.findById(goal.clubId);
            const scoredPlayer = await playerModel.findById(goal.scoredPlayerId);
            const assistedPlayer = await playerModel.findById(goal.assistedPlayerId);

            if (clubGoal._id.equals(club1._id)) {
                rs.club = 1;
            } else if (clubGoal._id.equals(club2._id)) {
                rs.club = 2;
            }
            rs.scoredPlayer = scoredPlayer.name;
            if (assistedPlayer) {
                rs.assistedPlayer = assistedPlayer.name;
            }

            return rs;
        }));
        delete match.club1Id;
        delete match.club2Id;
        // delete match.club1.appearances;
        // delete match.club1.substitutes;
        // delete match.club2.appearances;
        // delete match.club2.substitutes;

        res.status(200).send({ message: "success", data: match });
    }



    async getAll(req, res) {
        const { round, seasonId, result } = req.query;

        // Tìm tất cả các trận đấu có round và seasonId hoặc clubId
        // Vì là query nên có thể có field = null
        var queries = {};

        if (round) {
            queries.round = round;
        }
        if (seasonId) {
            queries.seasonId = seasonId;
        }else {
            res.status(400).send({message: "Request invalid"});
            return;
        }
        // if (clubId) {
        //     queries.$or = [{ "club1Id": clubId }, { "club2Id": clubId }];
        // }
        console.log(queries);
        if ( result ) {
            var matches = await matchModel.find(queries).select("_id club1Id club2Id datetime isPlayed").lean();
        }else {
            var matches = await matchModel.find(queries).select("_id club1Id club2Id datetime isPlayed result").lean();
        }
        
        for ( const match of matches ) {
            const club1 = await clubModel.findById(match.club1Id);
            const club2 = await clubModel.findById(match.club2Id);
            match.club1 = {
                _id: club1._id,
                name: club1.name,
                logo: club1.image
            }
            match.club2 = {
                _id: club2._id,
                name: club2.name,
                logo: club2.image
            };
        }
        console.log(matches);
        res.status(200).send({ message: "success", data: matches });
        return;

    }

    async create(req, res) {
        const match = req.body;
        match.isPlayed = false;
        match.goals = [];
        match.cards = [];
        match.result = { 'club1': -1, 'club2': -1 };

        try {
            const doc = new matchModel(match);
            doc.save();
        } catch (error) {
            res.status(400).send({ message: "Unable to create" });
            return;
        }

        res.status(201).send({ message: "Created successfully" });
        return;
    }

    async update(req, res) {
        const { _id, ...updated } = req.body;

        try {
            await matchModel.findByIdAndUpdate(_id, updated);
            res.status(200).send({ message: "Updated successfully" });
            return;
        } catch (error) {
            res.status(400).send({ message: "Couldn't update this match" });
            return;
        }
    }

    async delete(req, res) {
        const matchId = req.body.matchId;

        try {
            await matchModel.findByIdAndDelete(matchId);
            res.status(200).send({ message: "Deleted successfully" });
            return;
        } catch (error) {
            res.status(400).send({ message: "Couldn't find this match" });
            return;
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

            console.log(goalDoc);

            if (goalDoc.clubId.equals(match.club1Id)) {
                match.result.club1++;
            } else if (goal.clubId.equals(match.club2Id)) {
                match.result.club2++;
            } else {
                res.status(400).send({ message: "Invalid scored club" });
                return;
            }

            match.goals.push(goalDoc._id);

            match.save();
            res.status(200).send({ message: "Added Goal successfully" });
            return;

        } catch (error) {
            res.status(400).send({ message: "Unable to add goal" });
            return;
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
            match.cards.push(card);
            match.save();
            res.status(200).send({ message: "Added Card Successfully" });
            return;
        } catch (error) {
            res.status(400).send({ message: "Unable to add goal" });
            return;
        }
    }
}

const matchController = new MatchController();
module.exports = matchController;