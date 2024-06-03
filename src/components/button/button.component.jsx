import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles.jsx'


export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}
// create helper function for button
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    /* map the values received from props button */
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

    }[buttonType]
);
 
const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        // implement string interpolation for button type classes
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
};

export default Button;