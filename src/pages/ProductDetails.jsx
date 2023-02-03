import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';
import cart from '../assets/images/cart.svg'
import back from '../assets/images/back.svg'
import next from '../assets/images/next.svg'
import { addProductThunk } from '../store/slices/purchases.slice';

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

    const [quantity, setQuantity] = useState(0)

    const addProduct = () => {
        const cart = {
            productId: product.id,
            quantity: quantity + 1,
        }
        dispatch(addProductThunk(cart))
    }

    const [imageSelected, setImageSelected] = useState(0)

    const nextImage = () => {
        if(imageSelected < 2){
            setImageSelected(imageSelected + 1)
        }
    }

    const backImage = () => {
        if(imageSelected > 0){
            setImageSelected(imageSelected - 1)
        }
    }

    const plusProduct = () => {
        setQuantity(quantity + 1)
    }

    const minusProduct = () => {
        if(quantity > 0){
        setQuantity(quantity - 1)
        }
    }


    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='product-detail-img'>
                        <button className='product-detail-button back' onClick={() => backImage()}><img src={back} alt="" /></button>
                        <div className='product-detail-img-box'>
                            <img src={product.images?.[imageSelected]?.url} alt="" />
                        </div>
                        <button className='product-detail-button next' onClick={() => nextImage()}><img src={next} alt="" /></button>
                    </div>
                    <div className='litle-img'>
                        {product.images?.map(img => (
                            <div key={img.id} className='litle-img-box' onClick={() => setImageSelected(product.images.findIndex(select => select.id === img.id))}>
                                <img src={img.url} alt="" />
                            </div>
                        ))}
                    </div>
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
                            <div className="quantity-section">
                                <button className='quantity-button' onClick={() => minusProduct()}>-</button>
                                <input className='quantity-value' type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
                                <button className='quantity-button' onClick={() => plusProduct()}>+</button>
                            </div>
                        </div>
                    </div>
                    <button onClick={addProduct} className='product-detail-addcart'><span>Add to cart </span><img src={cart} alt="" /></button>
                </div>
            </div>



            <h3 className='similar-title '>Discover similar items</h3>
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