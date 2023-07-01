const seasonRouter = require('./season.router');
const clubRouter = require('./club.router');
const playerRouter = require('./player.router');
const matchRouter = require('./match.router');
const reportRouter = require('./report.router');

module.exports = function (app) {
    app.use('/api/season', seasonRouter);
    app.use('/api/club', clubRouter);
    app.use('/api/player', playerRouter);
    app.use('/api/match', matchRouter);
    app.use('/api/report', reportRouter);
}