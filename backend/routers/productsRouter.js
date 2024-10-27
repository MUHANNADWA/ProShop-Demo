import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(`Something went wrong ${error}`);
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id

    const product = await productModel.findById(id);
    if (!product) {
        res.status(404).send("product not found");
    }
    else res.status(200).send(product);
})


router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const newProduct = await productModel.create(data);
        newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send(`Something went wrong ${error}`);
    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const data = req.body;

    const product = await productModel.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
        res.status(404).send("product not found");
    }
    else res.status(204).send(product);
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
        res.status(404).send("product not found");
    }
    else res.send("deleted");
})

export default router;