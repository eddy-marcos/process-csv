import app from './app.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = undefined;

(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
  };

  const PORT = process.env.PORT || 5000; 

  await mongoose.connect(uri, mongooseOpts)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)));

  await mongoose.disconnect();
  })();

