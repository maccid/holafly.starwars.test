const People = require('../../app/People');
const Planet = require('../../app/Planet');

const _isWookieeFormat = (req) => {

    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
   
        const people = await People.peopleFactory(req.params.id, req.query.format);
        const planet = await Planet.planetFactory(people.getHomeworldId(), req.query.format);

        const data = {
            name: people.getName(),
            mass: people.getMass(),
            height: people.getHeight(),
            homeworldId: people.getHomeworldId(),
            homeworldName: planet.getName()
        }

        res.send(data);
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {

        const planet = await Planet.planetFactory(req.params.id, req.query.format);

        const data = {
            name: planet.getName(),
            gravity: planet.getGravity(),
        }

        res.send(data);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;