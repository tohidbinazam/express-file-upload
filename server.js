const dotenv  = require('dotenv')
const express = require('express')
const app = express();
const colors = require('colors')
const connectMongoDB = require('./config/db');
const photoModel = require('./models/photoModel');
const multer = require('multer')
const path = require('path')

// Dotenv init
dotenv.config()

// Connect MongoDB
connectMongoDB()

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './media/photos')
    },
    filename : (req, file, cb) => {
        let ext = path.extname(file.originalname)
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024*1024*4
    },
    fileFilter : (req, file, cb) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/svg') {
            cb(null, true)
        } else {
            cb(console.log('Invalid file type'))
        }
    }
})

app.post('/upload', upload.array('photos', 8), (req, res) => {
    res.send('File upload done')
})

app.listen(process.env.PORT, () => {
    console.log(`${process.env.SERVER_NAME} server running on port ${process.env.PORT}`);
})