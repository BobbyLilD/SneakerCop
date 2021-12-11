const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:Shashlik1@localhost:5432/SneakerCop');

const initDB = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Sequelize initialized');
    } catch(error){
        console.log(error);
        process.exit();
    }
};

module.exports = {
    sequelize,
    initDB
};