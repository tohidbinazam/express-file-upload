const mongoose = require('mongoose')

const photoModel = mongoose.Schema({
    photo : {
        type : String,
        required : [true, 'Photo is required']
    }
},{ timestamps : true })

module.exports = mongoose.model('Photo', photoModel)