const AbstractPlanet = require('./abstractPlanet');
const swapiFunctions = require('../swapiFunctions')

class CommonPlanet extends AbstractPlanet {
    constructor(id){
        super(id);
        this.id = id;
    }

    async init(){
        const data = await swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${this.getId()}`, 'GET', null, true);
        
        this.name = data.name;
        this.gravity = data.gravity;

        return this;
    }
}

module.exports = CommonPlanet;