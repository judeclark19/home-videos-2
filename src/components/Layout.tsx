/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { GlobalStylesDiv, PageTitle, colors } from './GlobalStyles';
import "../globals.css";
import { RecoilRoot } from 'recoil';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (

        <GlobalStylesDiv>
            <Head>
                <title>{'Fox Family Home Videos'}</title>
                <meta name="description" content={'Videos by Jim Fox, website by Jude Clark'} />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <PageTitle>
                Fox Family Home Videos
            </PageTitle>
            <RecoilRoot>
                <main>{children}</main>
            </RecoilRoot>
        </GlobalStylesDiv>
    );
};

export default Layout;
