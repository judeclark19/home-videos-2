'use client';

import React from 'react'
import { StyledNav } from './Nav.styles'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRecoilValue } from 'recoil';
import { currentPageNumberState } from '../../app/providers';

function Nav() {

    const pathname = usePathname()

    const currentPage = useRecoilValue<number>(currentPageNumberState);
    return (
        <StyledNav>
            <ul>
                <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href={`/?page=${currentPage}`}>All Videos</Link></li>
                <li><Link className={`link ${pathname === '/random' ? 'active' : ''}`} href="/random">Random Video</Link></li>
                <li><Link className={`link ${pathname === '/favorites' ? 'active' : ''}`} href="/favorites">Favorites</Link></li>
                <li><Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">Custom search/filter</Link></li>
            </ul>
        </StyledNav>
    )
}

export default Nav