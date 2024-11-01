const express = require('express');
const superheroController = require('../controllers/superheroController');

const router = express.Router();

router.get('/superheroes', superheroController.getSuperheroes);

router.post('/superheroes', superheroController.createSuperhero);

router.delete('/superhero/:id', superheroController.deleteSuperhero);

router.get('/superhero/:id', superheroController.getSuperhero);

router.put('/superhero/:id', superheroController.editSuperhero);

module.exports = router;