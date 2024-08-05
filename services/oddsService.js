const getDb = require('../config/database').getDb;
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const OddsUtils = require('../utils/oddsUtils');
const URL_KEY= process.env.URL_KEY

const saveOdds = async (match) => {
    try {
        // const db = await getDb();
        const responseForKey = await fetch(`${URL_KEY}${match}`);
        if (!responseForKey.ok) {
            throw new Error(`HTTP error! status: ${responseForKey.status}`);
        }
        const dataKey = await responseForKey.json();
        const key = dataKey.key;
        const mapOdds = OddsUtils.createEmptyMap();
        
        const principal = await OddsUtils.retrieveOddsInfo(match, key, 'principali');
        const goal = await OddsUtils.retrieveOddsInfo(match, key, 'goal');
        const underOver = await OddsUtils.retrieveOddsInfo(match, key, 'under/over');
        const results = await OddsUtils.retrieveOddsInfo(match, key, 'risultato%20esatto');
        const multigoal = await OddsUtils.retrieveOddsInfo(match, key, 'multigoal');
        const comboUO = await OddsUtils.retrieveOddsInfo(match, key, 'combo%20u/o%20match');


        OddsUtils.updateMapFromEsito(mapOdds, principal.esitoMap);
        OddsUtils.updateMapFromEsito(mapOdds, goal.esitoMap);
        OddsUtils.updateMapFromEsito(mapOdds, underOver.esitoMap);
        OddsUtils.updateMapFromEsito(mapOdds, multigoal.esitoMap);
        OddsUtils.updateMapFromEsito(mapOdds, comboUO.esitoMap);
        
        const mapOddsObject = OddsUtils.convertMapToObject(mapOdds);
        return mapOddsObject;
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = {
    saveOdds,
};