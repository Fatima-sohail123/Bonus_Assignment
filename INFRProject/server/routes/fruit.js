var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Fruit = require('../model/fruit');
const fruit = require('../model/fruit');
let fruitController = require('../controllers/fruit.js')
/* Get route for the fruit list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the fruits list */
router.get('/',async(req,res,next)=>{
try{
    const FruitList = await Fruit.find();
    res.render('Fruit/list',{
        title:'Fruits',
        FruitList:FruitList
    })}
    catch(err){
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Fruit/add',{
            title: 'Add Fruit'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newFruit = Fruit({
            "Type_of_Fruit_or_Veggie": req.body.Type_of_Fruit_or_Veggie,
            "Seeds": req.body.Seeds,
            "Organic": req.body.Organic,
            "Pounds": req.body.Pounds,
            "Cost": req.body.Cost
        });
        Fruit.create(newFruit).then(()=>{
            res.redirect('/fruitslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const fruitToEdit= await Fruit.findById(id);
        res.render('Fruit/edit',
            {
                title:'Edit Fruit',
                Fruit:fruitToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedFruit = Fruit({
            "_id":id,
            "Type_of_Fruit_or_Veggie": req.body.Type_of_Fruit_or_Veggie,
            "Seeds": req.body.Seeds,
            "Organic": req.body.Organic,
            "Pounds": req.body.Pounds,
            "Cost": req.body.Cost
        });
        Fruit.findByIdAndUpdate(id,updatedFruit).then(()=>{
            res.redirect('/fruitslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Fruit.deleteOne({_id:id}).then(()=>{
            res.redirect('/fruitslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;