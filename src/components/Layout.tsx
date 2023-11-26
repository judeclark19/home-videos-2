import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};



const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (

        <div>
            NAV BAR
            {/* Add your common layout elements here (e.g., header, footer) */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
