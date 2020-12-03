//-----------------------------------------------------------
//définir un model
//-----------------------------------------------------------

module.exports = (sequelize, Sequelize) => {
  const Offre = sequelize.define("offre", {
    idoffre: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    intitule_offre: {
      type: Sequelize.STRING
    },
    etat_offre: {
      type: Sequelize.STRING
    },
    debut_offre: {
      type: Sequelize.DATE
    },
    fin_offre: {
      type: Sequelize.DATE
    },

  });

  return Offre;
};