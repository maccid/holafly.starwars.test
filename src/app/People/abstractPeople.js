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
                error: 'La gravedad del planeta `'+ planet.getName()+'` es desconocida'
            };
        
        const weight = planet.getGravity() * this.getMass();
        
        return {
            success: true, 
            data: {
                people: this.getName(),
                planet: planet.getName(),
                weight: parseFloat(weight.toFixed(2))
            }
        };
    }
}

module.exports = AbstractPeople;