const AbstractPlanet = require('./abstractPlanet');
const swapiFunctions = require('../swapiFunctions')

const _extractGravityUnit = (url) => {
    const parts = url.split(' ');
    return parseFloat(parts[0], 10);
}

class CommonPlanet extends AbstractPlanet {
    constructor(id){
        super(id);
        this.id = id;
    }

    async init(){
        const data = await swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${this.getId()}`, 'GET', null, true);
        
        this.name = data.name;
        this.gravity = _extractGravityUnit(data.gravity);

        return this;
    }
}

module.exports = CommonPlanet;