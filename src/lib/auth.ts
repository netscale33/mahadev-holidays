import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function login(email: string, password: string, hashedPassword: string): Promise<string | null> {
  const isValid = await comparePassword(password, hashedPassword);
  if (!isValid) return null;
  return generateToken({ userId: email, email, role: 'admin' });
}

export function getTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

export function getAuthUserId(authHeader?: string): string | null {
  const token = getTokenFromHeader(authHeader);
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId || null;
}
