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
        if ( file.fieldname == 'photos' ) {
            cb(null, './media/photos')
        } else if( file.fieldname == 'cv' ){
            cb(null, './media/cv')
        }
        
    },
    filename : (req, file, cb) => {
        if ( file.fieldname == 'photos' ) {
            let ext = path.extname(file.originalname)
        
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + ext)

        } else if( file.fieldname == 'cv' ) {
            let ext = path.extname(file.originalname)
        
            let date = new Date()
            const uniqueSuffix = `${ date.getMonth() + 1 }-${ date.getDate() }-${ date.getFullYear() }`
            cb(null, uniqueSuffix + '-' + file.fieldname + '-' + Date.now() + ext)
        }
        
    }
})

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024*1024*4
    },
    fileFilter : (req, file, cb) => {

        if ( file.fieldname == 'photos' ) {
            if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/svg' ) {
            cb(null, true)
            } else {
            cb(console.log('Invalid file type'))
            }
        }else if( file.fieldname == 'cv' ) {

            if (file.mimetype == 'application/pdf') {
            cb(null, true)
            } else {
            cb(console.log('Invalid file type'))
            }
        }
        
    }
})

// Multer upload fields
const cpUpload = upload.fields([
    {name: 'photos', maxCount: 8},
    {name: 'cv', maxCount: 1}
])

app.post('/upload', cpUpload, (req, res) => {
    res.send('File upload done')
})

app.listen(process.env.PORT, () => {
    console.log(`${process.env.SERVER_NAME} server running on port ${process.env.PORT}`);
})