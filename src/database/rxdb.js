import { createRxDatabase, addRxPlugin, removeRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

const DB_NAME = "quotationdb_v14";
const REGISTRY_KEY = "__rentro_rxdb_registry__";

export const initDatabase = async () => {
  const registry = globalThis[REGISTRY_KEY] || (globalThis[REGISTRY_KEY] = {});
  if (registry[DB_NAME]) {
    const existing = await registry[DB_NAME];
    if (existing && typeof existing.addCollections === "function") {
      return existing;
    }
    delete registry[DB_NAME];
  }

  const storage = wrappedValidateAjvStorage({
    storage: getRxStorageDexie(),
  });

  const createDb = async () =>
    createRxDatabase({
      name: DB_NAME,
      storage,
      password: "myStrongPassword123!",
      multiInstance: true,
      eventReduce: true,
      closeDuplicates: true,
    });

  const dbPromise = createDb().catch(async (error) => {
    const message = String(error?.message || "");
    if (message.includes("DB9")) {
      try {
        await removeRxDatabase(DB_NAME, storage);
      } catch (removeError) {
        console.warn("RxDB reset failed", removeError);
      }
      return createDb();
    }
    throw error;
  });

  registry[DB_NAME] = dbPromise;
  const db = await dbPromise;
  registry[DB_NAME] = Promise.resolve(db);
  return db;
};

export const getDatabase = () => {
  const registry = globalThis[REGISTRY_KEY];
  const entry = registry ? registry[DB_NAME] : null;
  return entry && typeof entry.then !== "function" ? entry : null;
};
