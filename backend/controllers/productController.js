import Product from "../models/productModel.js";
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Fetch all products
// @route   GET /products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(`Something went wrong ${error}`);
        throw new Error('Resource not found');
    }
})

// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id

    const product = await Product.findById(id);
    if (!product) {
        res.status(404).send("product not found");
        throw new Error('Resource not found');
    }
    else {
        res.status(200).send(product);
    }
})


const addProduct = asyncHandler(async (req, res) => {
    try {
        const data = req.body;

        const newProduct = await Product.create(data);
        newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send(`Something went wrong ${error}`);
        throw new Error('Resource not found');
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const data = req.body;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
        res.status(404).send("product not found");
        throw new Error('Resource not found');
    }
    else res.status(204).send(product);
})

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        res.status(404).send("product not found");
        throw new Error('Resource not found');
    }
    else res.send("deleted");
})

export { getProducts, getProductById, addProduct, deleteProduct, updateProduct };
