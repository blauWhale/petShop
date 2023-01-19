const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost", "containers-us-west-123.railway.app:8004/railway"],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
