
// export const productSchema = {
//   title: 'Product Schema',
//   version: 0,
//   primaryKey: 'id',
//   type: 'object',
//   properties: {
//     id: {
//       type: 'string',
//       maxLength: 100
//     },
//     name: {
//       type: 'string'
//     },
//     description: {
//       type: 'string'
//     },
//     images: {
//       type: 'array',
//       items: {
//         type: 'object',
//         properties: {
//           imageUrl: { type: 'string' },
//           thumbnailUrl: { type: 'string' }
//         }
//       }
//     },
//     productFor: {
//       type: 'object',
//       properties: {
//         rent: {
//           type: 'object',
//           properties: {
//             monthlyPrice: { type: 'number' },
//             weeklyPrice: { type: 'number' }
//           }
//         }
//       }
//     },
//     category: {
//       type: 'string'
//     },
//     createdAt: {
//       type: 'string',
//       format: 'date-time'
//     },
//     updatedAt: {
//       type: 'string',
//       format: 'date-time'
//     }
//   },
//   required: ['id', 'name', 'createdAt'],
//   indexes: ['createdAt']
// };

// export const quotationSchema = {
//   title: 'Quotation Schema',
//   version: 0,
//   primaryKey: 'id',
//   type: 'object',
//   properties: {
//     id: {
//       type: 'string',
//       maxLength: 100
//     },
//     clientName: {
//       type: 'string'
//     },
//     quantity: {
//       type: 'number',
//       minimum: 1
//     },
//     serviceDays: {
//       type: 'string'
//     },
//     installationPeriod: {
//       type: 'string'
//     },
//     purchasePurpose: {
//       type: 'string'
//     },
//     quotationAmount: {
//       type: 'number',
//       minimum: 0
//     },
//     totalAmount: {
//       type: 'number',
//       minimum: 0
//     },
//     productId: {
//       type: 'string'
//     },
//     productDetails: {
//       type: 'object',
//       properties: {
//         id: { type: 'string' },
//         name: { type: 'string' },
//         description: { type: 'string' },
//         images: { 
//           type: 'array',
//           items: {
//             type: 'object',
//             properties: {
//               imageUrl: { type: 'string' }
//             }
//           }
//         }
//       }
//     },
//     status: {
//       type: 'string',
//       enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'],
//       default: 'draft'
//     },
//     createdAt: {
//       type: 'string',
//       format: 'date-time'
//     },
//     updatedAt: {
//       type: 'string',
//       format: 'date-time'
//     }
//   },
//   required: ['id', 'clientName', 'productId', 'createdAt', 'status'],
//   indexes: ['status', 'createdAt', 'clientName']
// };


// src/database/schemas.js
export const productSchema = {
  title: 'Product Schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          imageUrl: { type: 'string' },
          thumbnailUrl: { type: 'string' }
        }
      }
    },
    productFor: {
      type: 'object',
      properties: {
        rent: {
          type: 'object',
          properties: {
            monthlyPrice: { type: 'number' },
            weeklyPrice: { type: 'number' }
          }
        }
      }
    },
    category: {
      type: 'string'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['id', 'name', 'createdAt'],
  indexes: ['createdAt']
};

export const quotationSchema = {
  title: 'Quotation Schema',
  version: 2,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    clientName: {
      type: 'string'
    },
    quantity: {
      type: 'number',
      minimum: 1
    },
    serviceDays: {
      type: 'string'
    },
    installationPeriod: {
      type: 'string'
    },
    purchasePurpose: {
      type: 'string'
    },
    quotationAmount: {
      type: 'number',
      minimum: 0
    },
    quotationRefNo: {
      type: 'string'
    },
    countryCode: {
      type: 'string'
    },
    totalAmount: {
      type: 'number',
      minimum: 0
    },
    productId: {
      type: 'string' // This must always be a string, not null
    },
    productDetails: {
      type: 'object',
      additionalProperties: true,
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        images: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: true,
            properties: {
              imageUrl: { type: 'string' },
              baseUrl: { type: 'string' },
              uploadDir: { type: 'string' },
              imageId: { type: 'number' }
            }
          }
        }
      }
    },
    status: {
      type: 'string',
      enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'],
      default: 'draft'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    },
    _deleted: {
      type: 'boolean'
    },
    _rev: {
      type: 'string'
    },
    _meta: {
      type: 'object',
      properties: {
        lwt: {
          type: 'number'
        }
      }
    },
    _attachments: {
      type: 'object'
    }
  },
  required: ['id', 'clientName', 'productId', 'createdAt', 'status', 'quotationRefNo', 'countryCode', '_deleted', '_rev', '_meta', '_attachments'],
  indexes: ['status', 'createdAt', 'clientName', 'quotationRefNo', 'countryCode']
};
