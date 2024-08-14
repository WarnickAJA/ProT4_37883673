import Libro from "../Models/Libro.js";

const getAllLibros = async (req, res) => {
  try {
    const libros = await Libro.getAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros." });
  }
};

const getLibroById = async (req, res) => {
  try {
    const libro = await Libro.getOne(req.params.id);
    if (!libro)
      return res.status(404).json({ error: "El libro no fue encontrado." });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el libro." });
  }
};

/*const createLibro = async (req, res) => {
    try {
    const { nombre, autor, categoria, año_publicacion, ISBN } = req.body;

    if (!nombre || !autor || !categoria || !año_publicacion || !ISBN) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoLibro = await Libro.create(req.body);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro.' });
  }
};*/

// metodo creado por phind para manejar ISBN unico
const createLibro = async (req, res) => {
  try {
    const { nombre, autor, categoria, año_publicacion, ISBN } = req.body;

    if (!nombre || !autor || !categoria || !año_publicacion || !ISBN) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const nuevoLibro = await Libro.create(req.body);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    // Si el error es debido a un ISBN duplicado, enviamos una respuesta específica
    if (error.message === "El ISBN proporcionado ya existe.") {
      return res.status(409).json({ error: error.message }); // 409 Conflict
    }
    // Para otros errores, mantenemos la respuesta genérica
    res.status(500).json({ error: "Error al crear el libro." });
  }
};

const updateLibro = async (req, res) => {
  try {
    const libroActualizado = await Libro.update(req.params.id, req.body);
    if (!libroActualizado)
      return res.status(404).json({ error: "El libro no fue encontrado." });
    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro." });
  }
};

const deleteLibro = async (req, res) => {
  try {
    const eliminado = await Libro.delete(req.body.ISBN);
    if (!eliminado)
      return res.status(404).json({ error: "El libro no fue encontrado." });
    res.json({ message: "El libro fue eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro." });
  }
};

export { getAllLibros, getLibroById, createLibro, updateLibro, deleteLibro };
