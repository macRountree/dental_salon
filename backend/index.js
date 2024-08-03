import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import {db} from './config/db.js';
import servicesRoutes from './routes/servicesRoutes.js';
import appointmentsRoutes from './routes/appointmentsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {getServices} from './controllers/servicesControllers.js';
//* App config

//*Running env
dotenv.config();
const app = express();

//* read body Data
app.use(express.json());

//* DB connections
db();

//*!CORS config

const whiteList = [process.env.FRONTEND_URL];

if (process.argv[2] === '--postman') {
  whiteList.push(undefined);
}
//* need Options in object
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin); //* origin of our domain
    if (whiteList.includes(origin)) {
      //*Enable connection w/origin ('frontend localhost') // Create another env Url
      callback(null, true);
    } else {
      callback(new Error('Error Cors'));
    }
  },
};
app.use(cors(corsOptions));

//* route (when implements router, uses .use() instead .get)
//* use() is middleware (code that executes at HTTP request)
app.use('/api/services', servicesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/users', userRoutes);

//* port
//*if we host the app, hoisting injects his own PORT
const PORT = process.env.PORT || 8001;

//* app run

app.listen(PORT, () => {
  console.log(colors.blue('Port Service:', colors.blue.bgGreen(PORT)));
});
