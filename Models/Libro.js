import db from "../Config/db.js";

class Libro {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM libros");
    return rows;
  }

  static async getOne(id) {
    const [rows] = await db.query("SELECT * FROM libros WHERE id = ?", [id]);
    return rows[0];
  }

  /*static async create(data) {
    const { nombre, autor, categoria, año_publicacion, ISBN } = data;
    const [result] = await db.query(
      'INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)',
      [nombre, autor, categoria, año_publicacion, ISBN]
    );
    return { id: result.insertId, ...data };
  }*/

  //metodo creado por phind para tratar ISBN unico
  static async create(data) {
    const { nombre, autor, categoria, año_publicacion, ISBN } = data;

    // Verificar si el ISBN ya existe
    const [rows] = await db.query("SELECT * FROM libros WHERE ISBN = ?", [
      ISBN,
    ]);
    if (rows.length > 0) {
      throw new Error("El ISBN proporcionado ya existe.");
    }

    // Si el ISBN es único, procedemos a insertar el nuevo libro
    const [result] = await db.query(
      "INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)",
      [nombre, autor, categoria, año_publicacion, ISBN]
    );

    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { nombre, autor, categoria, año_publicacion, ISBN } = data;
    const [result] = await db.query(
      "UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, ISBN = ? WHERE id = ?",
      [nombre, autor, categoria, año_publicacion, ISBN, id]
    );
    return result.affectedRows > 0 ? { id, ...data } : null;
  }

  static async delete(ISBN) {
    const [result] = await db.query("DELETE FROM libros WHERE ISBN = ?", [
      ISBN,
    ]);
    return result.affectedRows > 0;
  }
}

export default Libro;
