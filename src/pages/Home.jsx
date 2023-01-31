import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProductsCategoryThunk, filterProductsNameThunk, getProductsThunk } from '../store/slices/products.slice';
import searchIcon from '../assets/images/searchIcon.svg'
import cart from '../assets/images/cart.svg'

const Home = () => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products)

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [newSearch, setNewSearch] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk());
        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
            .then(res => setCategories(res.data))
    }, [])

    console.log(productsList)

    return (
        <div className='home-container'>
            <div>
                <Accordion defaultActiveKey="0" className='accordion'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Category</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                {categories.map(category => (
                                    <li className='accordion-item' key={category.id} onClick={() => dispatch(filterProductsCategoryThunk(category.id))}>
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div>
                <InputGroup className="mb-3 input-search">
                    <Form.Control
                        placeholder="What are you looking for?"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={newSearch}
                        onChange={e => setNewSearch(e.target.value)}
                    />
                    <Button className='button-input' onClick={() => dispatch(filterProductsNameThunk(newSearch))} variant="outline-secondary" id="button-addon2">
                        <img src={searchIcon} alt="" />
                    </Button>
                </InputGroup>
                <ul className='product-list'>
                    {productsList.map(product => (
                        <li className='card-product' key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                            <div className='card-product-img'>
                                <img className='card-img-primary' src={product.images?.[0].url} alt="" />
                                <img className='card-img-hidden' src={product.images?.[1].url} alt="" />
                            </div>
                            <div className="card-data-container">
                                <article>
                                    <p className='card-data-brand'>{product.brand}</p>
                                    <p className='card-data-title'>{product.title}</p>
                                </article>
                                <article>
                                    <p className='card-data-brand'>Price</p>
                                    <p className='card-data-title'>{product.price}</p>
                                </article>
                                <button><img src={cart} alt="" /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>



        </div>
    );
};

export default Home;