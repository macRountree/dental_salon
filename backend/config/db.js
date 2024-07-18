import mongoose from 'mongoose';
import colors from 'colors';
export const db = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI); //* go to Mongo> DataServices> Connect > Drivers > copy uri string
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(colors.green(`MongoDB connection success => ${url}`));
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
