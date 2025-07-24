import type { Request, Response } from 'express'
import { Todos } from '../models/todo.js'

export async function createTodo(req: Request, res: Response) {
    try {
        const { title, description } = req.body

        if (!title || !description) {
            res.json({ message: 'Title and Description are required!', success: false }).status(400)
        }

        const newTodo = new Todos({
            title,
            description
        })

        await newTodo.save()

        console.log(newTodo);

        res.json({ message: 'Todo is created!', success: true, data: newTodo}).status(200)
    } catch (error) {
        res.json({ message: `Something Went Wrong: ${error}`, success: false }).status(500)
    }
}

export async function getTodos(req: Request, res: Response) {
    try {
        const result = await Todos.find()

        res.json({ message: 'Todo is fetched', success: true,data: result}).status(200)
    } catch (error) {
        res.json({ message: `Something Went Wrong: ${error}`, success: false }).status(500)
    }
}


export async function updateTodo(req:Request,res:Response){
    try {
        const todoId = req.params.id;
        const {status} = req.body;
        // console.log(status,40)
        const result = await Todos.findOneAndUpdate(
            {
                _id:todoId
            },
            {
                $set:{status}
            }
        )

        res.json({ message: 'Todo is fetched', success: true,data: result}).status(200)
    } catch (error) {
        res.json({ message: `Something Went Wrong: ${error}`, success: false }).status(500)
    }
}


export async function deleteTodo(req:Request,res:Response){
    try {
        const todoId = req.params.id;
        const {status} = req.body;
        const result = await Todos.findOneAndDelete(
            {
                _id:todoId
            }
        )

        res.json({ message: 'Todo is fetched', success: true}).status(200)
    } catch (error) {
        res.json({ message: `Something Went Wrong: ${error}`, success: false }).status(500)
    }
}