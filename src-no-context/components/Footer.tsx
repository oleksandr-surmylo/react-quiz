import React, { ReactNode } from 'react';

type IFooterProps = {
    children: ReactNode
}

const Footer = ( { children }: IFooterProps ) => {
    return (
        <footer>{ children }</footer>
    );
};

export default Footer;