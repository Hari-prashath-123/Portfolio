import { MongoClient, Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_DB || "portfolio"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env")
}

// Extend the Node.js global type to cache the connection across hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development reuse the global connection to avoid exhausting connections on hot-reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(MONGODB_URI)
  clientPromise = client.connect()
}

export async function getDb(): Promise<Db> {
  const c = await clientPromise
  return c.db(MONGODB_DB)
}

export default clientPromise
