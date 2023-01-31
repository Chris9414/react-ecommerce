import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';
import cart from '../assets/images/cart.svg'
import back from '../assets/images/back.svg'
import next from '../assets/images/next.svg'

const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({})

    const productList = useSelector(state => state.products)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data)
                dispatch(filterProductsCategoryThunk(res.data.category.id))
            })
    }, [id])

    console.log(product)

    return (
        <div>
            <div className='product-detail-container'>
                <div className='product-detail-img'>
                    <button className='product-detail-button back'><img src={back} alt="" /></button>
                    <img src={product.images?.[0].url} alt="" />
                    <button className='product-detail-button next'><img src={next} alt="" /></button>
                </div>
                <div>
                    <p className='product-detail-brand'>{product.brand}</p>
                    <p className='product-detail-title'>{product.title}</p>
                    <p className='product-detail-description'>{product.description}</p>
                    <div className='product-detail-price-container'>
                        <article>
                            <p className='product-detail-label'>Price</p>
                            <span className='product-detail-price'>${product.price}</span>
                        </article>
                        <div>
                            <p className='product-detail-label'>Quantity</p>
                            <div>
                                <button className='quantity-button'>-</button>
                                <span className='quantity-value'>1</span>
                                <button className='quantity-button'>+</button>
                            </div>
                        </div>
                    </div>
                    <button className='product-detail-addcart'><span>Add to cart </span><img src={cart} alt="" /></button>
                </div>
            </div>



            <h4>Discover similar items</h4>
            <ul className='product-list'>
                {
                    productList.map(productItem => (
                        <li className='card-product' key={productItem.id} onClick={() => navigate(`/product/${productItem.id}`)}>
                            <div className='card-product-img'>
                                <img className='card-img-primary' src={productItem.images?.[0].url} alt="" />
                                <img className='card-img-hidden' src={productItem.images?.[1].url} alt="" />
                            </div>
                            <div className="card-data-container">
                                <article>
                                    <p className='card-data-brand'>{productItem.brand}</p>
                                    <p className='card-data-title'>{productItem.title}</p>
                                </article>
                                <article>
                                    <p className='card-data-brand'>Price</p>
                                    <p className='card-data-title'>{productItem.price}</p>
                                </article>
                                <button><img src={cart} alt="" /></button>
                            </div>
                        </li>
                    ))
                }
            </ul>


        </div>
    );
};

export default ProductDetails;