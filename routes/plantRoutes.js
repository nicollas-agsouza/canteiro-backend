const express = require('express');
const router  = express.Router();
const plantController = require('../controllers/plantController');

// 1. Mova as rotas específicas para o topo
router.get('/stats/summary', plantController.getSummary);

// 2. Rotas genéricas e com parâmetros vêm depois
router.get('/',            plantController.listPlants);
router.get('/:id',         plantController.getPlantById); // Agora 'stats' não será confundido com ID
router.post('/',           plantController.createPlant);
router.put('/:id',         plantController.updatePlant);
router.patch('/:id/water', plantController.waterPlant);
router.delete('/:id',      plantController.deletePlant);

module.exports = router;
