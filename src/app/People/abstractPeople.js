class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
        throw new Error('To be implemented');
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldId() {
        return this.homeworldId;
    }

    getWeightOnPlanet(planet){

        if(!planet.getGravity() || isNaN(this.getMass()))
            return {
                success: false, 
                text: 'La gravedad del planeta `'+ planet.getName()+'` es desconocida'
            };
        
        const weight = planet.getGravity() * this.getMass();
        
        return {
            success: true, 
            text: 'El peso de `'+ this.getName() +'` en el planeta `'+ planet.getName()+'` es de '+ weight.toFixed(2)
        };

        //throw new Error('To be implemented');
    }
}

module.exports = AbstractPeople;