import express from 'express';
import morgan from 'morgan';
import LibroRoutes from './Routes/LibroRoutes.js';

const app = express();
app.set('port',3000);

app.use(morgan('dev'));
app.use(express.json());
app.use('/Libros', LibroRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
  });
  
