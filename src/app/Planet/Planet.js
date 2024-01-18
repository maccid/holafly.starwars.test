const swapiFunctions = require('../swapiFunctions')

class Planet {
    constructor(id){
        this.id = id;
    }

    async init(){

        const data = await swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${this.getId()}`, 'GET', null, true);
        
        this.name = data.name;
        this.gravity = data.gravity;

        return data;
        
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

module.exports = Planet;