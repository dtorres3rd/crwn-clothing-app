// use session feature of react
import { useContext } from 'react';

// use sesson data storage for cart
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss'

const Checkout = () => {
    // destructure session data storage from cart
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => {
                return (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                );
            })}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout;
