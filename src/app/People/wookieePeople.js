const AbstractPeople = require('./abstractPeople');
const swapiFunctions = require('../swapiFunctions')

const _extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
}

class WookieePeople extends AbstractPeople {

    constructor(id){
        super(id);
        this.id = id;
    }

    async init(){    
        const data = await swapiFunctions.genericRequest(`https://swapi.dev/api/people/${this.getId()}?format=wookiee`, 'GET', null, true);
        
        this.name = data.whrascwo;
        this.mass = data.scracc;
        this.height = data.acwoahrracao;
        this.homeworldId = _extractIdFromUrl(data.acooscwoohoorcanwa);
        
        return this;
    }        
}

module.exports = WookieePeople;

