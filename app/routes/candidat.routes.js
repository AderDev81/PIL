module.exports = app => {
  const candidats = require("../controllers/candidat.controller.js");

  var router = require("express").Router();

  // Creer un candidat
  router.post("/", candidats.create);

  // afficher tous les candidats
  router.get("/", candidats.findAll);
  router.get("/login", candidats.logIn);
  
  

  // afficher une offre par id 
  router.get("/:id", candidats.findOne);

  // modifier une offre par id
  
  router.put("/confirm", candidats.confirm);
  router.put("/:id", candidats.update);
  // supprimer une offre par id
  router.delete("/:id", candidats.delete);

  
  app.use('/api/candidats', router);
};