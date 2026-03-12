const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Food', 'Furniture', 'Other'],
  },
  supplierName: {
    type: String,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  reorderLevel: {
    type: Number,
    required: true,
    min: 0,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  productType: {
    type: String,
    required: true,
    enum: ['Perishable', 'Non-Perishable'],
  },
  status: {
    type: String,
    enum: ['Available', 'Out of Stock'],
    default: function() {
      return this.quantityInStock > 0 ? 'Available' : 'Out of Stock';
    },
  },
}, {
  timestamps: true,
});

// Auto-generate productId before saving
productSchema.pre('save', function(next) {
  if (!this.productId) {
    this.productId = 'PROD-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);