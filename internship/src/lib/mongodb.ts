import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://zayyanahmad765:EeVaIXsHI1qMKyOI@fulltext.ddmvk3a.mongodb.net/?retryWrites=true&w=majority&appName=fulltext"
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise 