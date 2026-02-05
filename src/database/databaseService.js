// // src/database/databaseService.js
// import { initDatabase } from './rxdb';
// import { productSchema, quotationSchema } from './schemas';
// import { v4 as uuidv4 } from 'uuid';

// class DatabaseService {
//   constructor() {
//     this.db = null;
//     this.initialized = false;
//   }

//   async initialize() {
//     if (this.initialized) return;

//     try {
//       this.db = await initDatabase();
      
//       // Add collections once (RxDB throws DB3 if they already exist)
//       const collectionsToAdd = {};
//       if (!this.db.collections.products) {
//         collectionsToAdd.products = {
//           schema: productSchema,
//           methods: {
//             // Custom methods for products
//             getByCategory(category) {
//               return this.find({ selector: { category } }).exec();
//             }
//           }
//         };
//       }
//       if (!this.db.collections.quotations) {
//         collectionsToAdd.quotations = {
//           schema: quotationSchema,
//           methods: {
//             // Custom methods for quotations
//             getByStatus(status) {
//               return this.find({ selector: { status } }).exec();
//             },
//             getByClient(clientName) {
//               return this.find({ 
//                 selector: { clientName },
//                 sort: [{ createdAt: 'desc' }]
//               }).exec();
//             }
//           }
//         };
//       }

//       if (Object.keys(collectionsToAdd).length > 0) {
//         await this.db.addCollections(collectionsToAdd);
//       }

//       this.initialized = true;
//       console.log('Database initialized successfully');
//     } catch (error) {
//       console.error('Database initialization failed:', error);
//       throw error;
//     }
//   }

//   // PRODUCT METHODS
//   async addProduct(productData) {
//     await this.initialize();
//     const product = {
//       id: uuidv4(),
//       ...productData,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };
//     return await this.db.products.insert(product);
//   }

//   async getProduct(id) {
//     await this.initialize();
//     return await this.db.products.findOne(id).exec();
//   }

//   async getAllProducts() {
//     await this.initialize();
//     return await this.db.products.find().sort({ createdAt: 'desc' }).exec();
//   }

//   async updateProduct(id, updateData) {
//     await this.initialize();
//     const product = await this.getProduct(id);
//     if (product) {
//       return await product.update({
//         $set: {
//           ...updateData,
//           updatedAt: new Date().toISOString()
//         }
//       });
//     }
//     return null;
//   }

//   async deleteProduct(id) {
//     await this.initialize();
//     const product = await this.getProduct(id);
//     if (product) {
//       await product.remove();
//       return true;
//     }
//     return false;
//   }

//   // QUOTATION METHODS
//   async createQuotation(quotationData) {
//     await this.initialize();
//     const quotation = {
//       id: uuidv4(),
//       ...quotationData,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       status: 'draft'
//     };
//     return await this.db.quotations.insert(quotation);
//   }

//   async getQuotation(id) {
//     await this.initialize();
//     return await this.db.quotations.findOne(id).exec();
//   }

//   async getAllQuotations() {
//     await this.initialize();
//     return await this.db.quotations.find()
//       .sort({ createdAt: 'desc' })
//       .exec();
//   }

//   async getQuotationsByStatus(status) {
//     await this.initialize();
//     return await this.db.quotations.find({
//       selector: { status }
//     }).sort({ createdAt: 'desc' }).exec();
//   }

//   async updateQuotationStatus(id, status) {
//     await this.initialize();
//     const quotation = await this.getQuotation(id);
//     if (quotation) {
//       return await quotation.update({
//         $set: {
//           status,
//           updatedAt: new Date().toISOString()
//         }
//       });
//     }
//     return null;
//   }

//   async deleteQuotation(id) {
//     await this.initialize();
//     const quotation = await this.getQuotation(id);
//     if (quotation) {
//       await quotation.remove();
//       return true;
//     }
//     return false;
//   }

//   // REAL-TIME QUERIES (Observables)
//   getProducts$() {
//     return this.db.products.find().$.pipe(
//       map(docs => docs.map(doc => doc.toJSON()))
//     );
//   }

//   getQuotations$() {
//     return this.db.quotations.find().$.pipe(
//       map(docs => docs.map(doc => doc.toJSON()))
//     );
//   }

//   getQuotationsByStatus$(status) {
//     return this.db.quotations.find({
//       selector: { status }
//     }).$.pipe(
//       map(docs => docs.map(doc => doc.toJSON()))
//     );
//   }

//   // BULK OPERATIONS
//   async importProducts(products) {
//     await this.initialize();
//     const docs = products.map(product => ({
//       id: uuidv4(),
//       ...product,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     }));
//     return await this.db.products.bulkInsert(docs);
//   }

//   // STATISTICS
//   async getQuotationStats() {
//     await this.initialize();
//     const quotations = await this.getAllQuotations();
    
//     const stats = {
//       total: quotations.length,
//       draft: quotations.filter(q => q.status === 'draft').length,
//       sent: quotations.filter(q => q.status === 'sent').length,
//       accepted: quotations.filter(q => q.status === 'accepted').length,
//       rejected: quotations.filter(q => q.status === 'rejected').length,
//       totalRevenue: quotations
//         .filter(q => q.status === 'accepted')
//         .reduce((sum, q) => sum + (q.totalAmount || 0), 0)
//     };

//     return stats;
//   }
// }

// // Export as singleton
// export const databaseService = new DatabaseService();


// src/database/databaseService.js
import { initDatabase } from './rxdb';
import { productSchema, quotationSchema } from './schemas';

const buildRefNo = (createdAt, fallbackSerial, countryCode = 'AE') => {
  const date = createdAt ? new Date(createdAt) : new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const serial = String(fallbackSerial).padStart(5, '0');
  return `RRO/${countryCode}/${yy}/${mm}/${serial}`;
};

let db = null;

export const databaseService = {
  async initialize() {
    if (db) return db;

    try {
      db = await initDatabase();

      // Create collections with schemas (skip if they already exist)
      const collectionsToAdd = {};
      if (!db.collections.products) {
        collectionsToAdd.products = { schema: productSchema };
      }
      if (!db.collections.quotations) {
        collectionsToAdd.quotations = {
          schema: quotationSchema,
          migrationStrategies: {
            1: (doc) => {
              const fallbackSerial = Math.floor(
                (new Date(doc.createdAt || Date.now()).getTime() / 1000) % 100000
              );
              return {
                ...doc,
                quotationRefNo:
                  doc.quotationRefNo || buildRefNo(doc.createdAt, fallbackSerial),
              };
            },
            2: (doc) => {
              const fallbackSerial = Math.floor(
                (new Date(doc.createdAt || Date.now()).getTime() / 1000) % 100000
              );
              const countryCode = doc.countryCode || 'AE';
              return {
                ...doc,
                countryCode,
                quotationRefNo:
                  doc.quotationRefNo || buildRefNo(doc.createdAt, fallbackSerial, countryCode),
              };
            },
          },
        };
      }
      if (Object.keys(collectionsToAdd).length > 0) {
        await db.addCollections(collectionsToAdd);
      }

      console.log('Database initialized successfully');
      return db;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  },

  async getProductsCollection() {
    await this.initialize();
    return db.products;
  },

  async getQuotationsCollection() {
    await this.initialize();
    if (!db.quotations) {
      await db.addCollections({
        quotations: {
          schema: quotationSchema,
          migrationStrategies: {
            1: (doc) => {
              const fallbackSerial = Math.floor(
                (new Date(doc.createdAt || Date.now()).getTime() / 1000) % 100000
              );
              return {
                ...doc,
                quotationRefNo:
                  doc.quotationRefNo || buildRefNo(doc.createdAt, fallbackSerial),
              };
            },
            2: (doc) => {
              const fallbackSerial = Math.floor(
                (new Date(doc.createdAt || Date.now()).getTime() / 1000) % 100000
              );
              const countryCode = doc.countryCode || 'AE';
              return {
                ...doc,
                countryCode,
                quotationRefNo:
                  doc.quotationRefNo || buildRefNo(doc.createdAt, fallbackSerial, countryCode),
              };
            },
          },
        },
      });
    }
    return db.quotations;
  },

  // Create a new quotation
  async createQuotation(data) {
    try {
      await this.initialize();
      
      // Validate required fields
      const requiredFields = ['id', 'clientName', 'productId', 'createdAt', 'status', 'quotationRefNo', 'countryCode'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      // Ensure productId is a valid non-empty string
      const normalizedProductId =
        data.productId !== undefined && data.productId !== null
          ? String(data.productId).trim()
          : '';
      if (!normalizedProductId) {
        throw new Error('productId must be a non-empty string');
      }
      
      const normalizedCountryCode =
        data.countryCode !== undefined && data.countryCode !== null
          ? String(data.countryCode).trim()
          : '';
      if (!normalizedCountryCode) {
        throw new Error('countryCode must be a non-empty string');
      }

      // Ensure required RxDB fields are present
      const quotationData = {
        ...data,
        productId: normalizedProductId,
        countryCode: normalizedCountryCode,
        _deleted: data._deleted !== undefined ? data._deleted : false,
        _attachments: data._attachments || {},
        _rev: data._rev || '1-',
        _meta: data._meta || {
          lwt: Date.now()
        }
      };
      
      const collection = await this.getQuotationsCollection();
      const result = await collection.insert(quotationData);
      
      console.log('Quotation created successfully:', result);
      return result;
      
    } catch (error) {
      console.error('Error creating quotation:', error);
      throw error;
    }
  },

  // Get all quotations
  async getAllQuotations() {
    try {
      const collection = await this.getQuotationsCollection();
      const results = await collection.find().exec();
      return results.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching quotations:', error);
      throw error;
    }
  },

  // Get quotation by ID
  async getQuotationById(id) {
    try {
      const collection = await this.getQuotationsCollection();
      const result = await collection.findOne(id).exec();
      return result ? result.toJSON() : null;
    } catch (error) {
      console.error('Error fetching quotation:', error);
      throw error;
    }
  },

  // Update quotation
  async updateQuotation(id, data) {
    try {
      const collection = await this.getQuotationsCollection();
      const doc = await collection.findOne(id).exec();
      
      if (!doc) {
        throw new Error(`Quotation with ID ${id} not found`);
      }
      
      await doc.update({
        $set: {
          ...data,
          updatedAt: new Date().toISOString()
        }
      });
      
      return await doc.toJSON();
    } catch (error) {
      console.error('Error updating quotation:', error);
      throw error;
    }
  },

  // Delete quotation (soft delete)
  async deleteQuotation(id) {
    try {
      const collection = await this.getQuotationsCollection();
      const doc = await collection.findOne(id).exec();
      
      if (!doc) {
        throw new Error(`Quotation with ID ${id} not found`);
      }
      
      await doc.update({
        $set: {
          _deleted: true,
          updatedAt: new Date().toISOString()
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting quotation:', error);
      throw error;
    }
  },

  // Get active quotations (not deleted)
  async getActiveQuotations() {
    try {
      const collection = await this.getQuotationsCollection();
      const results = await collection.find({
        selector: {
          _deleted: false
        }
      }).exec();
      return results.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error fetching active quotations:', error);
      throw error;
    }
  },

  // Get quotations by status
  async getQuotationsByStatus(status) {
    try {
      const collection = await this.getQuotationsCollection();
      const results = await collection.find({
        selector: {
          status: status,
          _deleted: false
        }
      }).exec();
      return results.map(doc => doc.toJSON());
    } catch (error) {
      console.error(`Error fetching ${status} quotations:`, error);
      throw error;
    }
  },

  // Search quotations by client name
  async searchQuotationsByClientName(clientName) {
    try {
      const collection = await this.getQuotationsCollection();
      const results = await collection.find({
        selector: {
          clientName: { $regex: new RegExp(clientName, 'i') },
          _deleted: false
        }
      }).exec();
      return results.map(doc => doc.toJSON());
    } catch (error) {
      console.error('Error searching quotations:', error);
      throw error;
    }
  }
};
