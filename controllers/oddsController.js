const oddsService = require('../services/oddsService');

exports.saveOdds = async (req, res, next) => {
    try {
        const home = req.body.homeTeam;
        const away = req.body.awayTeam;
        const league = req.body.league;
        const fixture = `${league}/${home}%20-%20${away}`
        const odd = await oddsService.saveOdds(fixture);
        res.json(odd);
    } catch (error) {
        next(error);
    }
};