import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { LoginInput } from '../validations/auth.validation';

const JWT_SECRET = process.env.JWT_SECRET || 'warkop-semesta-bahagia-secret-key';
const JWT_EXPIRES_IN = '7d';

export const AuthService = {
  async login(data: LoginInput) {
    const admin = await prisma.admin.findUnique({
      where: { username: data.username },
    });

    if (!admin) {
      throw new Error('Username atau password salah');
    }

    const isValid = await bcrypt.compare(data.password, admin.password);
    if (!isValid) {
      throw new Error('Username atau password salah');
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      token,
      admin: { id: admin.id, username: admin.username },
    };
  },

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  },

  async createAdmin(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.admin.create({
      data: { username, password: hashedPassword },
    });
  },
};
