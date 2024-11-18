const router = require('express').Router();
const Car = require('../models/car');
const User = require('../models/user');
const {verifyAndAuth} = require('./token');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');


//Route for getting allCars
router.get('/fetchCars/:id', verifyAndAuth, async (req, res)=>{
    try{
        const cars = await Car.find({user: req.params.id});
        res.status(200).json(cars);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

//Adding a new car
router.post('/addCar/:id', verifyAndAuth, upload.array('images', 10),  async (req, res)=>{


    req.files.map((file)=>{
        const ext = mime.extension(file.mimetype);
        const fileName = `${file.filename}.${ext}`;
        fs.renameSync(file.path, path.join('uploads', fileName));
    })

    const car = new Car({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        images: req.files.map((file)=>{return `${file.path}.${mime.extension(file.mimetype)}`}),
        user: req.user.id
    })

    try{
        const savedCar = await car.save();
        const user = await User.findById(req.params.id);
        user.cars.push(savedCar._id);
        await user.save();

        res.status(201).json(savedCar);
    }
    catch(err){
        res.status(500).json(err.message);
    }

});


//Updating an existing car
router.put('/updateCar/:id1/:id', verifyAndAuth, upload.array('images', 10), async (req, res)=>{

    req.files.map((file)=>{
        const ext = mime.extension(file.mimetype);
        const fileName = `${file.filename}.${ext}`;
        fs.renameSync(file.path, path.join('uploads', fileName));
    })

    const {title, description, tag} = req.body;
    const newCar = {};
    if(title){newCar.title = title};
    if(description){newCar.description = description};
    if(tag){newCar.tag = tag};
    if(req.files){newCar.images = req.files.map((file)=>{return `${file.path}.${mime.extension(file.mimetype)}`})};

    try{
        const updatedcar = await Car.findByIdAndUpdate(req.params.id1, {
            $set: newCar
        });
        if(!updatedcar){
            res.status(400).json("Not found");
        }
        res.status(201).json(updatedcar);
    }
    catch(err){
        res.status(500).json(err.message);
    }
    
})

//Deleting a car
router.delete('/deleteCar/:id1/:id', verifyAndAuth, async (req, res)=>{
    try{
        const deletedCar = await Car.findByIdAndDelete(req.params.id1) 
        const user = await User.findById(req.params.id);
        user.cars = user.cars.filter(id=> !id.equals(req.params.id1));

        await user.save();
        const cars = await Car.find();

        res.status(200).json(cars);
    }
    catch(err){
        res.status(403).json(err.message);
    }
});

//searching for cars
//created an text index on title, description, tag manually in mongodb cloud
router.get('/search', async (req, res)=>{
    try{
        const query = req.query.query;
        const matchedCars = await Car.find({$text: {$search: query}});
        res.status(200).json(matchedCars);
    }catch(err){
        res.status(500).json(err.message);
    }
})


module.exports = router;