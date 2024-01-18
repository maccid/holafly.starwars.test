const People = require('../../app/People');
const Planet = require('../../app/Planet');

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

        //17 no esta
        //61 falla el json
        const peopleId =  Math.floor(Math.random() * 82) + 1; 
        const planetId =  Math.floor(Math.random() * 60) + 1;

        console.log(peopleId, planetId)
        const people = await People.peopleFactory(peopleId, req.query.format);
        const planet = await Planet.planetFactory(planetId, req.query.format);

        if(people.getHomeworldId() == planetId) {
            res.send({
                success: false, 
                text: 'Se esta intentando calcular el peso de `'+ people.getName() +'` en su planeta natal `'+ planet.getName()+'`'
            });
            return;
        }

        const data = people.getWeightOnPlanet(planet);
           
        res.send(data);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;