import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedConnection | undefined;
  // eslint-disable-next-line no-var
  var isMongoUnavailable: boolean | undefined;
}

const cached: CachedConnection = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connect(): Promise<typeof mongoose> {
  if (global.isMongoUnavailable) {
    throw new Error('MongoDB is marked as unavailable. Using local JSON DB.');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // 2 seconds fast connection timeout
    });
  }

  try {
    cached.conn = await cached.promise;
    global.isMongoUnavailable = false;
  } catch (e) {
    cached.promise = null;
    global.isMongoUnavailable = true; // Flag MongoDB as down to avoid hanging later
    throw e;
  }

  return cached.conn;
}

export default connect;
