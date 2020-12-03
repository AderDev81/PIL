//-----------------------------------------------------------
//Initialiser sequelize
//-----------------------------------------------------------

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//-------------------------------------------------------------------------------------
//initialiser les entités de la base de données 
db.offres = require("./offre.model.js")(sequelize, Sequelize);
db.typeoffres = require("./typeoffre.model.js")(sequelize, Sequelize);

//-------------------------------------------------------------------------------------
// Relation entre les entités  
// typeoffre a plusieur offre 
db.typeoffres.hasMany(db.offres, {foreignKey: 'idtypeoffre', sourceKey: 'idtypeoffre'});
db.offres.belongsTo(db.typeoffres, {foreignKey: 'idtypeoffre', targetKey: 'idtypeoffre'});


module.exports = db;