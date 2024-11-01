const Superhero = require('../models/Superhero');
const multer = require('multer');
const Image = require('../models/Image');
const path = require('path');
const fs = require('fs');

const baseUrl = 'http://localhost:5050';

const getSuperheroes = async (req, res) => {
    try {
        const superheroes = await Superhero.findAll({ include: Image });
        res.json(superheroes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const createSuperhero = [
    upload.array('images'),
    async (req, res) => {
        try {
            const { nickname, realName, originDescription, superpowers, catchPhrase } = req.body;
            const superhero = await Superhero.create({
                nickname,
                realName,
                originDescription,
                superpowers,
                catchPhrase
            });

            if (req.files) {
                const imageInstances = req.files.map(file => ({
                    url: `${baseUrl}/${file.path}`,
                    superhero_id: superhero.id
                }));
                await Image.bulkCreate(imageInstances);
            }

            res.status(201).json(superhero);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

const deleteSuperhero = async (req, res) => {
    const { id } = req.params;
    try {
        const superhero = await Superhero.findByPk(id, {
            include: Image
        });

        if (!superhero) return res.status(404).send({ error: 'Superhero not found' });

        if (superhero.Images && superhero.Images.length > 0) {
            for (const image of superhero.Images) {
                const localPath = image.url.replace('http://localhost:5050/', '');
                fs.unlink(localPath, (err) => {
                    if (err) console.error('Error deleting image file:', err);
                })
            }
        }
        await Image.destroy({ where: { superhero_id: id } });
        await superhero.destroy();
        res.send({ message: 'Superhero deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting superhero' });
    }
};

const getSuperhero = async (req, res) => {
    const { id } = req.params;
    try {
        const superhero = await Superhero.findByPk(id, {
            include: Image
        });
        res.json(superhero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editSuperhero = [
    upload.array('images'),
    async (req, res) => {
        const { id } = req.params;
        const { nickname, realName, originDescription, superpowers, catchPhrase, imagesToRemove } = req.body;
        try {
            const superhero = await Superhero.findByPk(id, {
                include: Image
            });

            if (!superhero) return res.status(404).send({ error: 'Superhero not found' });

            if (imagesToRemove) {
                for (const image of JSON.parse(imagesToRemove)) {
                    const localPath = image.replace('http://localhost:5050/', '');
                    fs.unlink(localPath, (err) => {
                        if (err) console.error('Error deleting image file:', err);
                    })
                    await Image.destroy({ where: { url: image } });
                }
            }

            if (req.files) {
                const imageInstances = req.files.map(file => ({
                    url: `${baseUrl}/${file.path}`,
                    superhero_id: superhero.id
                }));
                await Image.bulkCreate(imageInstances);
            }

            await superhero.update({
                nickname: nickname,
                realName: realName,
                originDescription: originDescription,
                superpowers: superpowers,
                catchPhrase: catchPhrase
              });
            res.send(superhero);
        } catch (error) {
            res.status(500).send({ error: 'Error updating superhero' });
        }
    }
]

module.exports = {
    getSuperheroes,
    createSuperhero,
    deleteSuperhero,
    getSuperhero,
    editSuperhero
};