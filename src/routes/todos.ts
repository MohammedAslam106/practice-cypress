import express from 'express';
import {getTodos,createTodo,updateTodo,deleteTodo} from '../executables/todos.js'

const router = express.Router()

router
.get('/',getTodos)
.post('/',createTodo)
.put('/:id',updateTodo)
.delete('/:id',deleteTodo)


export default router