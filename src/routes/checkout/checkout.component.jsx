// use session feature of react
import { useContext } from 'react';

// use sesson data storage for cart
import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss'

const Checkout = () => {
    // destructure session data storage from cart
    const { cartItems, addItemToCart, removeItemToCart } = useContext(CartContext);

    return (
        <div>
            <h1>Checkout Page</h1>
            <div>
                {
                    cartItems.map((cartItem) => {
                        const { id, name, quantity } = cartItem;
                        return (
                            <div key={id}>
                                <h2>{name}</h2>
                                <span>{quantity}</span>
                                <br />
                                <span onClick={() => removeItemToCart(cartItem)}>decrement</span>
                                <br />
                                <span onClick={() => addItemToCart(cartItem)}>increament</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Checkout;
