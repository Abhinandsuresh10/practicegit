import express from 'express';
import { create, deletes, getDatas, update } from '../controllers/crud.controller.js';

const crudRoutes = express.Router();


// Create 
crudRoutes.post('/users', create);

// Update 
crudRoutes.put('/users/:id', update);

// Delete
crudRoutes.delete('/users/:id', deletes);

// GetDatas
crudRoutes.get('/users', getDatas)

export default crudRoutes;