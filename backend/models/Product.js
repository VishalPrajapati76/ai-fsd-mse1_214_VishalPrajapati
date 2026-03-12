const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    productCode: {
      type: String,
      required: [true, "Product code is required"],
      unique: true,
      trim: true,
      uppercase: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Electronics", "Clothing", "Food", "Furniture", "Other"]
    },
    supplierName: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true
    },
    quantityInStock: {
      type: Number,
      required: [true, "Quantity in stock is required"],
      min: [0, "Quantity cannot be negative"]
    },
    reorderLevel: {
      type: Number,
      required: [true, "Reorder level is required"],
      min: [0, "Reorder level cannot be negative"]
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit price is required"],
      min: [0, "Unit price cannot be negative"]
    },
    manufactureDate: {
      type: Date,
      required: [true, "Manufacture date is required"]
    },
    productType: {
      type: String,
      required: [true, "Product type is required"],
      enum: ["Perishable", "Non-Perishable"]
    },
    status: {
      type: String,
      enum: ["Available", "Out of Stock"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);