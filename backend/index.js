import express from 'express';
import servicesRoutes from './routes/servicesRoutes.js';
//* App config

const app = express();

//* route (when implements router, uses .use() instead .get)
//* use() is middleware (code that executes at HTTP request)
app.use('/api/services', servicesRoutes);

//* port
//*if we host the app, hoisting injects his own PORT
const PORT = process.env.PORT || 8000;

//* app run

app.listen(PORT, () => {
  console.log('Port es', PORT);
});
