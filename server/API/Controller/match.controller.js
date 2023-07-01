const matchModel = require('../../Model/match.model');
const clubModel = require('../../Model/club.model');
const goalModel = require('../../Model/goal.model');
const playerModel = require('../../Model/player.model');
const seasonModel = require('../../Model/season.model');
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

        async function listPlayers(listPlayers) {
            var list = [];
            for (let i = 0; i < listPlayers.length; i++) {
                const p = listPlayers[i];
                const player = await playerModel.findById(p.playerId);
                const { name, ...data } = player;

                var rs = new Object();
                rs.playerId = p.playerId;
                rs.shirtNumber = p.shirt_number;
                rs.name = name;

                list.push(rs);
            }
            return list;
        }
        for (let index = 0; index < club1.seasons.length; index++) {
            if (club1.seasons[index].seasonId.equals(match.seasonId)) {
                match.club1.players = await listPlayers(club1.seasons[index].players);
            }
        }
        for (let index = 0; index < club2.seasons.length; index++) {
            if (club2.seasons[index].seasonId.equals(match.seasonId)) {
                match.club2.players = await listPlayers(club2.seasons[index].players);
            }
        }

        // Lấy thông tin các bàn thắng. Sử dụng goalModel, id các bàn thắng, type, time của bàn thắng giữ nguyên
        // example:
        // match.goals = [ 
        //      {club: 1, time: 30, type: "p", scoredPlayer: "adfads", assistedPlayer: "adfads" }
        // ]
        if (match.goals != undefined) {
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
        } else {
            match.goals = [];
        }
        if (match.cards != undefined) {
            match.cards = await Promise.all(match.cards.map(async card => {
                const player = await playerModel.findById(card.playerId);
                var rs = {};
                rs._id = card._id;
                rs.club = card.club;
                rs.playerId = card.playerId;
                rs.time = card.time;
                rs.playerName = player.name;
                return rs;
            }));
        } else {
            match.cards = [];
        }
        delete match.club1Id;
        delete match.club2Id;

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
        } else {
            res.status(400).send({ message: "Request invalid" });
            return;
        }

        if (result) {
            var matches = await matchModel.find(queries).select("_id club1Id club2Id datetime isPlayed round stadium result").lean();
        } else {
            var matches = await matchModel.find(queries).select("_id club1Id club2Id datetime isPlayed round stadium").lean();
        }

        for (const match of matches) {
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

        const season = await seasonModel.findOne({ _id: seasonId });
        const numberOfClub = season.clubs.length;
        const numberOfRound = numberOfClub * 2 - 2;
        res.status(200).send({ message: "success", data: { matches, numberOfRound } });
        return;

    }

    async create(req, res) {
        const match = req.body;
        match.isPlayed = false;
        match.goals = [];
        match.cards = [];
        match.result = { 'club1': 0, 'club2': 0 };

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

        updated.round = Number(updated.round);
        updated.datetime = new Date(updated.datetime);

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
        const match = await matchModel.findById(matchId);
        if (!match) {
            res.status(400).send({ message: "Match not found" });
            return;
        }

        try {
            const goalDoc = new goalModel(goal);

            if (goalDoc.clubId.equals(match.club1Id)) {
                await matchModel.findByIdAndUpdate(matchId, { $inc: { "result.club1": 1 }, isPlayed: true });
            }
            if (goalDoc.clubId.equals(match.club2Id)) {
                await matchModel.findByIdAndUpdate(matchId, { $inc: { "result.club2": 1 }, isPlayed: true });
            }

            match.goals.push(goalDoc._id);
            goalDoc.save();
            match.save();
            res.status(200).send({ message: "Added Goal successfully" });
            return;

        } catch (error) {
            res.status(400).send({ message: "Unable to add goal" });
            return;
        }
    }

    async deleteGoal(req, res) {
        const goalId = req.body.goalId;
        const matchId = req.body.matchId;

        const goal = await goalModel.findById(goalId);
        const match = await matchModel.findById(matchId);

        try {
            match.goals.pull(goalId);
            match.save();

            if (goal.clubId.equals(match.club1Id)) {
                await matchModel.findByIdAndUpdate(matchId, { $inc: { "result.club1": -1 } });
            }
            if (goal.clubId.equals(match.club2Id)) {
                await matchModel.findByIdAndUpdate(matchId, { $inc: { "result.club2": -1 } });
            }

            await goalModel.findByIdAndDelete(goalId);
            res.status(200).send({ message: 'Deleted goal successfully!' });
            return;
        } catch (error) {
            res.status(400).send({ message: "Deleted goal failed" });
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
            await matchModel.findByIdAndUpdate(matchId, { isPlayed: true });
            res.status(200).send({ message: "Added Card Successfully" });
            return;
        } catch (error) {
            res.status(400).send({ message: "Unable to add goal" });
            return;
        }
    }

    async deleteCard(req, res) {
        const cardId = req.body.cardId;
        const matchId = req.body.matchId;

        const match = await matchModel.findById(matchId);
        try {
            match.cards.pull({ _id: cardId });
            match.save();
            res.status(200).send({ message: 'Deleted card successfully!' });
            return;
        } catch (error) {
            res.status(400).send({ message: "Deleted card failed" });
            return;
        }
    }
}

const matchController = new MatchController();
module.exports = matchController;