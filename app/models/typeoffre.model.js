//-----------------------------------------------------------
//définir un model
//-----------------------------------------------------------
module.exports = (sequelize, Sequelize) => {
  const Typeoffre = sequelize.define("typeoffre", {
    idtypeoffre: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    intitule_typeoffre: {
      type: Sequelize.STRING
    },
    
  });

  return Typeoffre;
};