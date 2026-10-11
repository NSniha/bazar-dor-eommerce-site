import { MongoClient } from "mongodb";
import dns from "node:dns";

if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME || "bazar_dor";

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

const mongoClient =
  globalThis._bazarDorMongoClient || new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalThis._bazarDorMongoClient = mongoClient;
}

const db = mongoClient.db(databaseName);

export { mongoClient, db };