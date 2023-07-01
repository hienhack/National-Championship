const seasonModel = require('../../Model/season.model');
const clubModel = require('../../Model/club.model');
const matchModel = require('../../Model/match.model');
const goalModel = require('../../Model/goal.model');
const playerModel = require('../../Model/player.model');

class ReportController {
    async getStandings(req, res) {
        const seasonId = req.params.seasonId;
        const season = await seasonModel.findById(seasonId);
        async function getClubData(listClubId) {
            var list = [];
            for (let k = 0; k < listClubId.length; k++) {
                const clubId = listClubId[k];
                const rs = {};

                const club = await clubModel.findById(clubId);

                rs.clubId = club._id;
                rs.name = club.name;

                const queries = {};
                queries.seasonId = seasonId;
                queries.isPlayed = true;
                queries.$or = [{ "club1Id": rs.clubId }, { "club2Id": rs.clubId }];
                const matches = await matchModel.find(queries);

                rs.Played = matches.length;

                var won, lost, drawn, scored, conceded, points;
                won = lost = drawn = scored = conceded = points = 0;
                for (let index = 0; index < matches.length; index++) {

                    const match = matches[index];

                    for (let i = 0; i < match.goals.length; i++) {
                        const goalId = match.goals[i];
                        const goalDetail = await goalModel.findById(goalId);

                        if (goalDetail.clubId.equals(rs.clubId)) {

                            scored += 1;

                        }
                        else {
                            conceded += 1;
                        }
                    }
                    if (matches[index].club1Id.equals(rs.clubId)) {
                        if (match.result.club1 > match.result.club2) won++;
                        else if (match.result.club1 < match.result.club2) lost++;
                        else drawn++;
                    } else {
                        if (match.result.club2 > match.result.club1) won++;
                        else if (match.result.club2 < match.result.club1) lost++;
                        else drawn++;
                    }
                }
                points = won * 3 + drawn;
                rs.points = points;
                rs.won = won;
                rs.lost = lost;
                rs.drawn = drawn;
                rs.scored = scored;
                rs.conceded = conceded;
                rs.goalDifference = scored - conceded;

                list.push(rs);
            }
            list.sort((a, b) => b.points - a.points);
            return list;
        }

        const data = await getClubData(season.clubs);

        res.status(200).send({ message: "success", data: data })
    }

    async getGoals(req, res) {
        const seasonId = req.params.seasonId;
        const season = await seasonModel.findById(seasonId);
        const listGoals = await goalModel.find({ seasonId: seasonId });
        async function listRankedPlayerData(listClubId) {
            var list = [];
            //each club
            for (let index = 0; index < listClubId.length; index++) {
                const clubId = listClubId[index];
                const club = await clubModel.findOne({ _id: clubId, "seasons.seasonId": seasonId });
                //each player
                for (let i = 0; i < club.seasons[0].players.length; i++) {
                    const rs = {};
                    rs.club = club.name;
                    const playerId = club.seasons[0].players[i].playerId;
                    const player = await playerModel.findById(playerId);
                    rs.player = player.name;
                    rs.nationality = player.nationality;
                    var goals = 0;
                    for (let j = 0; j < listGoals.length; j++) {
                        const goal = listGoals[j];
                        if (goal.clubId.equals(club._id) && goal.scoredPlayerId.equals(player._id)) {
                            goals += 1;
                        }
                    }

                    rs.goals = goals;
                    list.push(rs);
                }
            }
            list.sort((a, b) => b.goals - a.goals)
            return list;
        }
        const data = await listRankedPlayerData(season.clubs);

        res.status(200).send({ message: "success", data: data })
    }
}

const reportController = new ReportController();
module.exports = reportController;