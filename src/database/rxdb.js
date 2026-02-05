// import { createRxDatabase } from "rxdb";
// import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

// let dbPromise;

// const quotationSchema = {
//   title: "quotation schema",
//   version: 0,
//   description: "Stores rental quotations",
//   primaryKey: "id",
//   type: "object",
//   properties: {
//     id: { type: "string", maxLength: 100 },
//     createdAt: { type: "string" },
//     productName: { type: "string" },
//     quantity: { type: "number" },
//     quotationAmount: { type: "number" },
//     quotationRefNo: { type: "string" },
//     installationPeriod: { type: "string" },
//     countryCode: { type: "string" },
//   },
//   required: [
//     "id",
//     "createdAt",
//     "productName",
//     "quantity",
//     "quotationAmount",
//     "quotationRefNo",
//     "installationPeriod",
//     "countryCode",
//   ],
// };

// export async function getDatabase() {
//   if (!dbPromise) {
//     dbPromise = createRxDatabase({
//       name: "rentrodb",
//       storage: getRxStorageDexie(),
//     }).then(async (db) => {
//       await db.addCollections({
//         quotations: {
//           schema: quotationSchema,
//         },
//       });
//       return db;
//     });
//   }

//   return dbPromise;
// }



// src/database/rxdb.js
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';

// Add plugins
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

const DB_KEY = "__rentro_rxdb_v4__";
let databaseInstance = null;

export const initDatabase = async () => {
  if (databaseInstance) return databaseInstance;
  if (globalThis[DB_KEY]) {
    databaseInstance = globalThis[DB_KEY];
    return databaseInstance;
  }

  const storage = wrappedValidateAjvStorage({
    storage: getRxStorageDexie()
  });

  databaseInstance = await createRxDatabase({
    name: 'quotationdb_v4', // Database name
    storage,
    password: 'myStrongPassword123!', // For encryption
    multiInstance: false, // Set to true if using multiple tabs
    eventReduce: true, // Better performance
  });

  globalThis[DB_KEY] = databaseInstance;

  return databaseInstance;
};

export const getDatabase = () => databaseInstance;
