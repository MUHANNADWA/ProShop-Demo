import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {

    const [product, setProduct] = useState([]);
    const { id: productId } = useParams();
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`http://localhost:5000/products/${productId}`);
            if (!response.ok) {
                throw Error(`${response.statusText} : ${response.status}`)
            }
            return await response.json();
        }
        fetchProducts().then((data) => {
            setProduct(data); console.log(data);
        }).catch((error) => alert(error));
    }, [productId]);


    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            <Row>
                <Col md='4'>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md='5'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Descreption: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md='3'>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-lock' type='button' disabled={product.countInStock == 0} >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen