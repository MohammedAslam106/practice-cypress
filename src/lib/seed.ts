// scripts/seed.js
import mongoose from "mongoose";
import { Todos} from '../models/todo.js';
import dotenv from 'dotenv'


async function seed() {
    dotenv.config({path:'.env'})
    await mongoose.connect(process.env.DB_URL!)
    try {

        await Todos.deleteMany({}); // Optional: clear existing test data
        await Todos.insertMany([
            {
                title: 'Fake Todo 1',
                description: 'This is the todo created by GitHub Actions',
            },
            {
                title: 'Fake Todo 2',
                description: 'This is the todo created by GitHub Actions',
            },
        ]);

        console.log('✅ Successfully seeded MongoDB');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
}

seed();
