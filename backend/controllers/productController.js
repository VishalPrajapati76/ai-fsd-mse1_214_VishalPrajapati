const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productCode,
      category,
      supplierName,
      quantityInStock,
      reorderLevel,
      unitPrice,
      manufactureDate,
      productType,
      status,
    } = req.body;

    // Check duplicate product code
    const existingProduct = await Product.findOne({ productCode });
    if (existingProduct) {
      return res.status(400).json({ message: "Product code already exists" });
    }

    const product = new Product({
      productName,
      productCode,
      category,
      supplierName,
      quantityInStock,
      reorderLevel,
      unitPrice,
      manufactureDate,
      productType,
      status,
    });

    const newProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If productCode is being changed, check uniqueness
    if (
      req.body.productCode &&
      req.body.productCode !== product.productCode
    ) {
      const existingProduct = await Product.findOne({
        productCode: req.body.productCode,
      });

      if (existingProduct) {
        return res.status(400).json({ message: "Product code already exists" });
      }
    }

    Object.assign(product, req.body);

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search products by product name or category
const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const products = await Product.find({
      $or: [
        { productName: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};