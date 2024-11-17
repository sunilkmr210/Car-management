const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {type:String, required: true},
    description: {type:String, required: true},
    // a space separated string consisting of many tags
    tag: {type:String},
    images: {type:Array}
});

module.exports = mongoose.model('Car', carSchema);