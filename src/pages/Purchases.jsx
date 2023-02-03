import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1 className='purchases-title'>Purchases</h1>
            <ul className='purchase-list'>
                {purchases.map(purchase => (
                    <li key={purchase.id} style={{textDecoration: "none"}}>
                        <Link to={`/product/${purchase.product?.id}`}>
                            <div className="purchase-item">
                                <div className='purchase-img-box'>
                                    <img src={purchase.product?.images[0].url} alt="" />
                                </div>
                                <p className='purchase-title'> {purchase.product?.title}</p>
                                <p className='purchase-date'>{purchase.product?.createdAt}</p>
                                <p className='purchase-quantity'>{purchase.quantity}</p>
                                <p>${purchase.product?.price}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Purchases;