import React, { ReactNode } from 'react';

interface IProps {
    children: ReactNode
}

const Main = ( { children }: IProps ) => {
    return (
        <main className='name'>
            { children }
        </main>
    );
};

export default Main;