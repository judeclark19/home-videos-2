import Head from 'next/head';
import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (

        <div>
            <Head>
                <title>{'Fox Family Home Videos'}</title>
                <meta name="description" content={'Videos by Jim Fox, website by Jude Clark'} />
            </Head>
            <h1 style={{ textAlign: 'center' }}>
                Fox Family Home Videos
            </h1>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
