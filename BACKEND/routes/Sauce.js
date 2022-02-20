// j'importe les packages nécessaires
const express = require("express");
// La fonction Router d'express permet de créer des routes individuelles 
// pour créer des objets router
const router = express.Router();

// j'importe les autres dépendances nécessaires
const sauceCtrl = require("../controllers/Sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//configurations des routes
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;