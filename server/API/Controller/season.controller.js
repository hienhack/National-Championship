const seasonModel = require('../../Model/season.model');
const clubModel = require('../../Model/club.model');

const RECENT_YEAR_QUERY = "recent"


class SeasonController {
    async getSeason(req, res) {
        let result = {};

        const year = req.params.year;
        if (year === RECENT_YEAR_QUERY) {
            result = await seasonModel.find().sort({ yearStart: -1 }).limit(1);
        } else {
            const pattern = /^\d+-\d+$/;
            if (year.match(pattern)) {
                const start = parseInt(year.split('-')[0]);
                const end = parseInt(year.split('-')[1]);
                result = await seasonModel.findOne({ yearStart: start, yearEnd: end });
            } else {
                res.status(400).send({ message: "Invalid URL format" });
                return;
            }
        }

        if (result == null) {
            res.status(400).send({ message: "Season not found" });
            return;
        }
        result.clubs = result.clubs.map(async clubId => {
            let club = await clubModel.findOne({ _id: clubId });
            const { seasons, ...info } = club;
            return info;
        });

        res.status(200).send({ message: "success", data: result });
    }

    async getAllSeason(req, res) {
        const result = await seasonModel.find();

        res.status(200).send({ message: "success", data: result });
    }

    async create(req, res) {
        let season = req.body;
        season.clubs = [];

        const document = new seasonModel(season);
        try {
            await document.save();
        } catch(error) {
            res.status(400).send({ message: "Invalid season" });
            return;
        }

        res.status(200).send({ message: "Added Successfully" });
    }

    async update(req, res) {
        const { _id, ...updated} = req.body;
        
        const rs = await seasonModel.findOneAndUpdate({ _id: _id }, updated, { new: true});
        res.status(200).send({ message: "Undated Successfully" });
    }

    async delete(req, res) {
        const id = req.body.id;
        await seasonModel.deleteOne({ _id: id });

        res.status(200).send({ message: "Deleted Successfully" });
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

        res.status(200).send({ message: "Added Successfully"});
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

        res.status(200).send({ message: "Added Successfully"});
    }
}

const seasonController = new SeasonController();
module.exports = seasonController;