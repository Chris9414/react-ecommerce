import { Offcanvas } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { Button } from 'react-bootstrap';
import { deleteCartThunk, purchaseCartThunk, updateQuantityThunk } from '../store/slices/purchases.slice';
import back from '../assets/images/back.svg'
import next from '../assets/images/next.svg'
import trash from '../assets/images/trash.svg'

const PurchasesSidebar = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    console.log(cart)

    const incrementQuantity = (cartItem) => {
        dispatch(updateQuantityThunk(cartItem.id, cartItem.quantity + 1))
    }

    const decrementQuantity = (cartItem) => {
        if(cartItem.quantity > 1){
        dispatch(updateQuantityThunk(cartItem.id, cartItem.quantity - 1))
        }
    }

    const deleteProduct = (cartItem) => {
        dispatch(deleteCartThunk(cartItem.id))
    }

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {cart.map(cartItem => (
                            <li key={cartItem.createdAt} className="cart-li">
                                <div className='cart-section1'>
                                    <div className='cart-img-box'>
                                        <img src={cartItem.product?.images[0].url} alt="" />
                                    </div>
                                    <div>
                                        <p>{cartItem.product.title}</p>
                                        <div className='cart-quantity-box'>
                                            <button><img src={back} alt="" onClick={() => decrementQuantity(cartItem)}/></button>
                                            <input type="text" className='cart-quantity-input' value={cartItem.quantity}/>
                                            <button><img src={next} alt="" onClick={() => incrementQuantity(cartItem)}/></button>
                                        </div>
                                    </div>
                                    <img src={trash} alt="" />
                                </div>
                                <div className='cart-total-box' onClick={() => deleteProduct(cartItem)}>
                                    <p><span>Total: $</span>{cartItem.product.price * cartItem.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
                <Button onClick={() => dispatch(purchaseCartThunk())} variant="primary">
                    Check out
                </Button>
            </Offcanvas>

        </div>
    );
};

export default PurchasesSidebar;