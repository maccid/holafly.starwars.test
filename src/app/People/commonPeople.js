const AbstractPeople = require('./abstractPeople');
const swapiFunctions = require('../swapiFunctions')

class CommonPeople extends AbstractPeople {
    constructor(id){
        super(id);
        this.id = id;
    }

    async init(){
        
        const data = await swapiFunctions.genericRequest(`https://swapi.dev/api/people/${this.id}`, 'GET', null, true);
    

        return data;
       // throw new Error('To be implemented');
    }
}

module.exports = CommonPeople;