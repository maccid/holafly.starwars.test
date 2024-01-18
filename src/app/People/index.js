const WookieePeople = require('./wookieePeople');
const CommonPeople = require('./commonPeople');

const peopleFactory = async (id, lang) => {
    const people = lang == 'wookiee' ?  new WookieePeople(id):  new CommonPeople(id);

    await people.init();
    return people;
}

module.exports = { peopleFactory }