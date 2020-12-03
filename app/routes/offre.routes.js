module.exports = app => {
  const offres = require("../controllers/offre.controller.js");

  var router = require("express").Router();

  // Creer une offre
  router.post("/", offres.create);

  // afficher tous les offres
  router.get("/", offres.findAll);
  router.get("/OffreActive", offres.findAllActive);
  

  // afficher une offre par id 
  router.get("/:id", offres.findOne);

  // modifier une offre par id
  router.put("/:id", offres.update);

  // supprimer une offre par id
  router.delete("/:id", offres.delete);

  
  app.use('/api/offres', router);
};