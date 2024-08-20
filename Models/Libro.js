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

    // Convertir el año a una fecha (primer día del año)
    const fechaPublicacion = new Date(`${año_publicacion}-01-02`);

    // Si el ISBN es único, procedemos a insertar el nuevo libro
    const [result] = await db.query(
      "INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)",
      [nombre, autor, categoria, fechaPublicacion, ISBN]
    );

    return { id: result.insertId, ...data };
  }

  /*static async update(id, data) {
    const { nombre, autor, categoria, año_publicacion, ISBN } = data;
    const [result] = await db.query(
      "UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, ISBN = ? WHERE id = ?",
      [nombre, autor, categoria, año_publicacion, ISBN, id]
    );
    return result.affectedRows > 0 ? { id, ...data } : null;
  }*/

  //version modif de update para tener en cuenta capos vacios
  static async update(id, data) {
    const { nombre, autor, categoria, año_publicacion, ISBN } = data;

    // Crear un array para almacenar las cláusulas SET y sus valores correspondientes
    let setClauses = [];
    let values = [];

    // Agregar cada campo al array si está presente en el cuerpo de la solicitud
    if (nombre !== undefined) {
      setClauses.push(`nombre = ?`);
      values.push(nombre);
    }
    if (autor !== undefined) {
      setClauses.push(`autor = ?`);
      values.push(autor);
    }
    if (categoria !== undefined) {
      setClauses.push(`categoria = ?`);
      values.push(categoria);
    }
    if (año_publicacion !== undefined) {
      //modificacion para pasar año a tipo date
      const fechaPublicacion = new Date(`${año_publicacion}-01-02`);
      setClauses.push(`año_publicacion = ?`);
      values.push(fechaPublicacion);
    }
    if (ISBN !== undefined) {
      setClauses.push(`ISBN = ?`);
      values.push(ISBN);
    }

    // Construir la parte SET de la consulta SQL
    const setClause = setClauses.join(", ");

    // Ejecutar la consulta de actualización
    const [result] = await db.query(
      `UPDATE libros SET ${setClause} WHERE id = ?`,
      [...values, id] // Añadir el ID al final de los valores para usarlo en la cláusula WHERE
    );

    // Verificar si se afectó alguna fila
    if (result.affectedRows > 0) {
      // Si se actualizó algún libro, retornar los datos actualizados
      const [updatedBook] = await db.query(
        "SELECT * FROM libros WHERE id = ?",
        [id]
      );
      return updatedBook[0];
    } else {
      // Si no se encontró el libro o no hubo cambios, retornar null
      return null;
    }
  }

  static async delete(ISBN) {
    const [result] = await db.query("DELETE FROM libros WHERE ISBN = ?", [
      ISBN,
    ]);
    return result.affectedRows > 0;
  }
}

export default Libro;
