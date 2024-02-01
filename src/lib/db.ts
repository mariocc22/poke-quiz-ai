import { PrismaClient } from "@prisma/client"; // import the PrismaClient from the @prisma/client package
import "server-only"; // import the server-only module to declare the global variable

// declare the global variable to cache the PrismaClient instance and not generating a nw one on each request
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

// create a new PrismaClient instance if the app is running in production mode, otherwise use the cached instance, this is a Singleton pattern
export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}