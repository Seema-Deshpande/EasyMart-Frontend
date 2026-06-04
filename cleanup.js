import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from './src/models/User.js';

mongoose.connect(process.env.MONGO_URI).then(async () => {
    await User.deleteMany({ email: 'test@example.com' });
    console.log('Cleanup successful');
    process.exit(0);
});
