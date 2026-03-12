# Retail Inventory Management System - Backend API

A Node.js Express API for managing retail store inventory and products.

## Features

- Add new products to inventory
- View all available products
- Update product details
- Delete products from inventory
- Search products by name or category
- Automatic status updates (Available/Out of Stock)

## Product Fields

- Product ID (Auto-generated)
- Product Name
- Product Code (Unique)
- Category (Electronics, Clothing, Food, Furniture, etc.)
- Supplier Name
- Quantity in Stock
- Reorder Level
- Unit Price
- Manufacture Date
- Product Type (Perishable / Non-Perishable)
- Status (Available / Out of Stock)

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=your-mongodb-atlas-connection-string
   PORT=5000
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search?name=...&category=...` - Search products

## Usage

Use tools like Postman or curl to test the API endpoints. The API accepts and returns JSON data.

## Deployment

1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas is configured correctly
3. Deploy the application using services like Heroku, Vercel, or AWS

## License

ISC