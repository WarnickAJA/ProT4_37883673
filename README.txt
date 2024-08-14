API REST básica de CRUD con libros.

Detalles a tener en cuenta:
- año_publicacion es de tipo DATE
- ISBN tiene un máximo de 13 caracteres.
- Las consultas están pensadas para realizarse mediante Postman.

Nombre de la DB: libros_db

Solicitudes disponibles

1.Obtener Todos los Libros (GET)
// URL: http://localhost:3000/libros
// Método: GET
// No se requiere cuerpo en la solicitud.


2.Obtener Libro por ID (GET)
// URL: http://localhost:3000/libros/{id}
// Método: GET
// Reemplaza {id} con el ID del libro que deseas obtener.


3.Crear un Nuevo Libro (POST)
// URL: http://localhost:3000/libros
// Método: POST
// Cuerpo de la solicitud: {
  "nombre": "El nombre del libro",
  "autor": "El autor del libro",
  "categoria": "La categoría del libro",
  "año_publicacion": "El año de publicación",
  "ISBN": "El ISBN del libro"
}


4.Actualizar Libro (PUT)
// URL: http://localhost:3000/libros/{id}
// Método: PUT
// Reemplaza {id} con el ID del libro que deseas actualizar.
// Cuerpo de la solicitud: Similar al POST, pero solo incluye los campos que deseas actualizar.


5.Eliminar Libro (DELETE)
// URL: http://localhost:3000/libros
// Método: DELETE
// Cuerpo de la solicitud: {
  "ISBN": "El ISBN del libro que deseas eliminar"
}