const express = require("express");
const router = express.Router();
const uploadProductImages = require("../helpers/multer");
const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");
const {
    addProduct,
    updateProduct,
    getAllProducts,
} = require("../controllers/productController");

router.get("/getProduct", getAllProducts);
router.post("/addProduct",authGuard,isAdmin, uploadProductImages, addProduct);
router.put("/updateProduct/:id",authGuard,isAdmin, uploadProductImages, updateProduct);

module.exports = router;
