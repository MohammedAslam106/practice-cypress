import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv'
import todoRouter from './routes/todos'
import path from 'path';
import fs from 'node:fs'

dotenv.config({
    path:'.env'
})

// console.log('DATABASE URL',process.env.DB_URL)

const app = express()

app.use(express.json())

app.use('/api/todos',todoRouter)

const fileAddres = path.join(process.cwd(), 'fe', 'dist');

console.log(fileAddres)
app.use(express.static(fileAddres));

// Check existence
const indexPath = path.join(fileAddres, 'index.html');

// Catch-all route
app.get('/*wildcard', (req, res) => {
    res.sendFile(indexPath);
});


app.listen(5000,async()=>{
    try {
        await mongoose.connect(process.env.DB_URL!)
        console.log('Connected to DB')
        console.log('Listening on port 5000...')
        
    } catch (error) {
        console.error('Something Went Wrong',error)
        process.exit(1)
    }
})
