import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.components';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles.jsx';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>

          {currentUser ? (
            /* NavLink base component will be rendered as span, not as a link*/
            <NavLink as ='span' onClick={signOutHandler}>
              {' '}
              SIGN OUT{' '}
            </NavLink>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropDown/>}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
