const seasonModel = require('../../Model/season.model');
const clubModel = require('../../Model/club.model');

const RECENT_YEAR_QUERY = "recent"


class SeasonController {
    async getSeason(req, res) {
        let result = {};

        const year = req.params.year;
        if (year === RECENT_YEAR_QUERY) {
            result = await seasonModel.find().sort({ year: -1 }).limit(1);
        } else {
            const pattern = /^\d+$/;
            if (year.match(pattern)) {
                result = await seasonModel.findOne({ year: parseInt(year) });
            } else {
                res.status(400).send({ message: "invalid URL format" });
                return;
            }
        }

        if (result == null) {
            res.status(400).send({ message: "season not found" });
            return;
        }
        result.clubs = result.clubs.map(async clubId => {
            let club = await clubModel.findOne({ _id: clubId }).select('_id name imag');
            return club;
        });

        res.status(200).send({ message: "success", data: result });
    }

    async getAllSeason(req, res) {
        const result = await seasonModel.find().select('_id seasonName year start end');

        res.status(200).send({ message: "success", data: result });
    }

    async create(req, res) {
        let season = req.body;
        season.clubs = [];

        const document = new seasonModel(season);
        try {
            await document.save();
        } catch(error) {
            res.status(400).send({ message: "invalid season" });
            return;
        }

        res.status(200).send({ message: "added successfully" });
    }

    async update(req, res) {
        const { _id, ...updated} = req.body;
        
        const rs = await seasonModel.findOneAndUpdate({ _id: _id }, updated, { new: true});
        res.status(200).send({ message: "updated successfully" });
    }

    async delete(req, res) {
        const id = req.body.id;
        await seasonModel.deleteOne({ _id: id });

        res.status(200).send({ message: "deleted successfully" });
    }

    async addClub(req, res) {
        const seasonId = req.body.seasonId;
        const clubId = req.body.clubId;

        const season = await seasonModel.findOne({ _id: seasonId });
        season.clubs.push(clubId);
        season.save();

        const club = await clubModel.findOne({ _id: clubId });
        club.seasons.push(seasonId);
        club.save();

        res.status(200).send({ message: "added successfully"});
    }

    async removeClub(req, res) {
        const seasonId = req.body.seasonId;
        const clubId = req.body.clubId;

        const season = await seasonModel.findOne({ _id: seasonId });
        season.clubs.splice(season.clubs.indexOf(clubId), 1);
        season.save();

        const club = await clubModel.findOne({ _id: clubId });
        club.seasons.splice(club.seasons.indexOf(seasonId), 1);
        club.save();

        res.status(200).send({ message: "removed successfully"});
    }
}

const seasonController = new SeasonController();
module.exports = seasonController;