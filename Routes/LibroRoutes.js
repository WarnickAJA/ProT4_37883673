import express from 'express';
import {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
} from '../Controllers/LibroController.js';

const router = express.Router();

router.get('/', getAllLibros);
router.get('/:id', getLibroById);
router.post('/', createLibro);
router.put('/:id', updateLibro);
router.delete('/', deleteLibro);

export default router;
