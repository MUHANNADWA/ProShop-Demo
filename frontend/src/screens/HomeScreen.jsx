import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product.jsx";

const HomeScreen = () => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {

        const response = await fetch('http://localhost:5000/products',);
        if (!response.ok) {
            throw Error(`${response.statusText} : ${response.status}`)
        }
        return await response.json();
    }
    
    useEffect(() => {
        fetchProducts().then((data)=>{ setProducts(data); console.log(data);
        }).catch((error) => alert(error));
    }, []);



    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}></Product>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
