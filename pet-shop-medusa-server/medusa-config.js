const dotenv = require('dotenv')

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'production':
		ENV_FILE_NAME = '.env.production';
		break;
	case 'staging':
		ENV_FILE_NAME = '.env.staging';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	case 'development':
	default:
		ENV_FILE_NAME = '.env';
		break;
}

try {
	dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001,https://legendary-caramel-4107d1.netlify.app,https://63c9b82f590e3931a3e6904a--legendary-caramel-4107d1.netlify.app";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,https://petshop-frontend-production.up.railway.app";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-payment-manual`,
  'medusa-fulfillment-manual',
  
 /* {
    resolve:'medusa-plugin-filestorage-local',
    options: {
      // The baseurl for your medusajs server
    serverBaseUrl: "http://localhost:9000",
    // when enabled saves the file as a base64 encoded string inside the database (deleting that row is not yet supported)
    saveInDatabase: false, // recommended: false
    // the folder where your files are stored on the server
    fileLocation: "uploads/",
         },
    
},*/
{
  resolve: `medusa-file-s3`,
  options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access_key_id: process.env.S3_ACCESS_KEY_ID,
        secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
  },
},
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  /*
   {
    resolve: `medusa-payment-stripe`,
     options: {
      api_key: STRIPE_API_KEY,
       webhook_secret: STRIPE_WEBHOOK_SECRET,
     },
   },*/
];

module.exports = {
  projectConfig: {
    // redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
     database_url: DATABASE_URL,
     database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
	  redis_url: REDIS_URL,

  },
  plugins,
};
