// Authentication utilities
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLoginAt: string;
}

export interface AuthData {
  user: User;
  token: string;
}

const AUTH_STORAGE_KEY = 'immersive_train_auth';

export class AuthManager {
  static saveAuth(authData: AuthData): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    } catch (error) {
      console.error('Failed to save auth data:', error);
    }
  }

  static getAuth(): AuthData | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to get auth data:', error);
      return null;
    }
  }

  static clearAuth(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  static isAuthenticated(): boolean {
    const auth = this.getAuth();
    return auth !== null && auth.token !== undefined;
  }

  static getUser(): User | null {
    const auth = this.getAuth();
    return auth?.user || null;
  }

  static getToken(): string | null {
    const auth = this.getAuth();
    return auth?.token || null;
  }
}