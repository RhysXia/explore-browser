export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const isDev = process.env.NODE_ENV === 'development';

export const serverHost = process.env.SERVER_HOST || 'localhost:3000';
