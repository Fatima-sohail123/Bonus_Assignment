var express = require('express');
var router = express.Router();
let Fruit = require('../model/fruit');
const fruit = require('../model/fruit');
let fruitController = require('../controllers/fruit.js');

/* Read Operation --> Get route for displaying the fruits list */
router.get('/', async (req, res, next) => {
    try {
        const FruitList = await Fruit.find();
        res.render('Fruit/list', {
            title: 'Fruits',
            displayName: req.user ? req.user.displayName : '',
            FruitList: FruitList,
        });
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

/* Create Operation --> Get route for displaying the Add Page */
router.get('/add', async (req, res, next) => {
    try {
        res.render('Fruit/add', {
            title: 'Add Fruit',
            displayName: req.user ? req.user.displayName : '',
        });
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

/* Create Operation --> Post route for processing the Add Page */
router.post('/add', async (req, res, next) => {
    try {
        let newFruit = Fruit({
            "Type_of_Fruit_or_Veggie": req.body.Type_of_Fruit_or_Veggie,
            "Seeds": req.body.Seeds,
            "Organic": req.body.Organic,
            "Pounds": req.body.Pounds,
            "Cost": req.body.Cost,
        });
        Fruit.create(newFruit).then(() => {
            res.redirect('/fruitslist');
        });
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

/* Update Operation --> Get route for displaying the Edit Page */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const fruitToEdit = await Fruit.findById(id);
        res.render('Fruit/edit', {
            title: 'Edit Fruit',
            displayName: req.user ? req.user.displayName : '',
            Fruit: fruitToEdit,
        });
    } catch (err) {
        console.error(err);
        next(err); // Passing the error
    }
});

/* Update Operation --> Post route for processing the Edit Page */
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedFruit = Fruit({
            "_id": id,
            "Type_of_Fruit_or_Veggie": req.body.Type_of_Fruit_or_Veggie,
            "Seeds": req.body.Seeds,
            "Organic": req.body.Organic,
            "Pounds": req.body.Pounds,
            "Cost": req.body.Cost,
        });
        Fruit.findByIdAndUpdate(id, updatedFruit).then(() => {
            res.redirect('/fruitslist');
        });
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

/* Delete Operation --> Get route to perform Delete operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        Fruit.deleteOne({ _id: id }).then(() => {
            res.redirect('/fruitslist');
        });
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

module.exports = router;
