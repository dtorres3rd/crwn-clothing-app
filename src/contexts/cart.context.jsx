import { createContext, useState, useEffect } from "react";

// create helper function for add cart item

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // checker: if found same item, increment quantity or create new item to include product
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            // if true, new array
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            // else
            : cartItem
        );
    }

    // return new array with modified cartItems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// create another helper function for remove cart item
const removeCartItem = (cartItems, cartItemRemove) => {
    // pseudo: find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemRemove.id);

    // pseudo: check current selected item quantity is equal to 1, if true, remove item from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemRemove.id);
    }

    // pseudo: if not, return cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemRemove.id
        // if true, new array
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        // else
        : cartItem
    );
};

// create another helper function for clear cart item
const clearCartItem = (cartItems, cartItemToClear) =>{
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // useEffect runs when something in the dependency array - cartItems array changes
    useEffect(() => {
        // pseudo code: parameters of callback: total and cartItem
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        // pseudo code: parameters of callback: total and cartItem
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    // expose values to be used as context = CartContext props
    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>;
};