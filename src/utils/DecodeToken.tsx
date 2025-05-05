
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  name: string;
  admin: boolean;
  role: string
  email: string
}

export const decodeToken = (token: string | null): JwtPayload | null => {
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error('Erro ao decodificar o token', error);
    return null;
  }
};