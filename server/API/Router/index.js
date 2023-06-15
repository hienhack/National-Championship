const seasonRouter = require('./season.router');
const clubRouter = require('./club.router');
const playerRouter = require('./player.router');
const scheduleRouter = require('./schedule.router');
const matchRouter = require('./match.router');
const reportRouter = require('./report.router');

module.exports = function(app) {
    app.use('/season', seasonRouter);
    app.use('/club', clubRouter);
    app.use('/player', playerRouter);
    app.use('/match', matchRouter);
    app.use('/schedule', scheduleRouter);
    app.use('/report', reportRouter);
}