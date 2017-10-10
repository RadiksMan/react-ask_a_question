import React from 'react';
import {CSSTransition} from 'react-transition-group';

export default function Fade({ children, ...props }){
    return (
        <CSSTransition
            timeout={300}
            classNames="fade"
            {...props}
        >
            {children}
        </CSSTransition>
    )
};