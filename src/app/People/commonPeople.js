const AbstractPeople = require('./abstractPeople');
const swapiFunctions = require('../swapiFunctions')

const _extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
}

class CommonPeople extends AbstractPeople {
    constructor(id){
        super(id);
        this.id = id;
    }

    async init(){
        
        const data = await swapiFunctions.genericRequest(`https://swapi.dev/api/people/${this.getId()}`, 'GET', null, true);
        
        this.name = data.name;
        this.mass = data.mass;
        this.height = data.height;
        this.homeworldId = _extractIdFromUrl(data.homeworld);
        
        return this;
    }
}

module.exports = CommonPeople;