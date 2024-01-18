
const WookieePlanet = require('./wookieePlanet');
const CommonPlanet = require('./commonPlanet');

const planetFactory = async (id, lang) => {
    const planet = lang == 'wookiee' ? new WookieePlanet(id) : new CommonPlanet(id);

    await planet.init();
    return planet;
}

module.exports = { planetFactory }
