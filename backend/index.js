import express from 'express';
import dotenv from 'dotenv';
import {db} from './config/db.js';
import servicesRoutes from './routes/servicesRoutes.js';
//* App config

//*Running env
dotenv.config();
const app = express();

//* DB connections
db();

//* route (when implements router, uses .use() instead .get)
//* use() is middleware (code that executes at HTTP request)
app.use('/api/services', servicesRoutes);

//* port
//*if we host the app, hoisting injects his own PORT
const PORT = process.env.PORT || 8001;

//* app run

app.listen(PORT, () => {
  console.log('Port es', PORT);
});
