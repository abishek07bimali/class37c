const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const thumbnail = req.files?.thumbnail
      ? `/uploads/${req.files.thumbnail[0].filename}`
      : null;

    const images = req.files?.images
      ? req.files.images.map(file => `/uploads/${file.filename}`)
      : [];

    const product = await Product.create({
      name,
      price,
      description,
      quantity,
      thumbnail,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { name, price, description, quantity } = req.body;

    const thumbnail = req.files?.thumbnail
      ? `/uploads/${req.files.thumbnail[0].filename}`
      : product.thumbnail;

    const images = req.files?.images?.length
      ? req.files.images.map(file => `/uploads/${file.filename}`)
      : product.images;

    await product.update({
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
      quantity: quantity ?? product.quantity,
      thumbnail,
      images,
    });

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,getAllProducts
};
