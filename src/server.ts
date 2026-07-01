import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS — handle preflight dulu sebelum middleware lain
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowed = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'https://frontend-ppm.vercel.app',
    ].filter(Boolean);
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  });
}

export default app;