module.exports = app => {
  const typeoffres = require("../controllers/typeoffre.controller.js");

  var router = require("express").Router();

  // Creer un type d'offre
  router.post("/", typeoffres.create);

  // afficher tous les type d'offre
  router.get("/", typeoffres.findAll);

  // rechercher un type d'offre par intitule  
  router.get("/find/:intituletypeoffre", typeoffres.findAllCrit);

  // rechercher un type d'offre par id
  router.get("/:id", typeoffres.findOne);

  // mettre à jour un type d'offre par id 
  router.put("/:id", typeoffres.update);

  // supprimer un type d'offre par id
  router.delete("/:id", typeoffres.delete);

  
  app.use('/api/typeoffres', router);
};