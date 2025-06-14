// نقطة دخول الخادم
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Yahya Reda API is running!');
});

// ربط قاعدة البيانات MongoDB عند تشغيل الخادم
connectDB();

// إضافة مسار projects API إلى الخادم
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
