const People = require('../../app/People');
const Planet = require('../../app/Planet');

const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        try {   
            const people = await People.peopleFactory(req.params.id, req.query.format);
            const planet = await Planet.planetFactory(people.getHomeworldId(), req.query.format);

            const data = {
                name: people.getName(),
                mass: people.getMass(),
                height: people.getHeight(),
                homeworldId: people.getHomeworldId(),
                homeworldName: planet.getName()
            }

            res.send({success: true, data});
        } catch (error) {
            res.send({success: false, error: 'Personaje no encontrado'});
        } 
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        try { 
            const planet = await Planet.planetFactory(req.params.id, req.query.format);

            const data = {
                name: planet.getName(),
                gravity: planet.getGravity(),
            }

            res.send({success: true, data});
        } catch (error) {
            res.send({success: false, error: 'Planeta no encontrado'});
        } 
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try {
            const peopleId =  Math.floor(Math.random() * 82) + 1; 
            const planetId =  Math.floor(Math.random() * 60) + 1;

            const people = await People.peopleFactory(peopleId, req.query.format);
            const planet = await Planet.planetFactory(planetId, req.query.format);

            if(people.getHomeworldId() == planetId) {
                res.send({
                    success: false, 
                    error: 'Se esta intentando calcular el peso de `'+ people.getName() +'` en su planeta natal `'+ planet.getName()+'`'
                });
                return;
            }

            const response = people.getWeightOnPlanet(planet);
            
            res.send(response);
        } catch (error) {
            res.send({success: false, error : 'Personaje no encontrado'});
        } 
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;