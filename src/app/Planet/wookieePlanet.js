const AbstractPlanet = require('./abstractPlanet');
const swapiFunctions = require('../swapiFunctions')

class WookieePlanet extends AbstractPlanet {

    constructor(id){
        super(id);
        this.id = id;
    }

    async init(){
        
        const data = await swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${this.getId()}?format=wookiee`, 'GET', null, true);

        this.name = data.whrascwo;
        this.gravity = data.rrrcrahoahaoro;

        return this;

    }
        
}

module.exports = WookieePlanet;

