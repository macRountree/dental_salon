import dotenv from 'dotenv';
import {db} from '../config/db.js';
import Services from '../models/Services.js';
import {services} from './dentalServices.js';
import colors from 'colors';
dotenv.config();
await db();
async function seedDB() {
  try {
    await Services.insertMany(services);
    console.log(colors.green.bold('Add data successfull'));
    process.exit();
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
}
async function clearDB() {
  try {
    await Services.deleteMany();
    console.log(colors.red.bold('data deleted'));
    process.exit();
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
}
//* need script to executed this functions by package.json

if (process.argv[2] === '--import') {
  seedDB();
} else {
  clearDB();
}
