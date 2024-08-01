import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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
const clearCartItem = (cartItems, cartItemToClear) => {
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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {
    // set state parameter key that is expected to change when using useReducer hook when calling dispatch
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        // pseudo code: parameters of callback: total and cartItem
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        // pseudo code: parameters of callback: total and cartItem
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        // calls cartreducer hook to send updated state for cart 
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            })
        );
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    // expose values to be used as context = CartContext props
    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>;
};