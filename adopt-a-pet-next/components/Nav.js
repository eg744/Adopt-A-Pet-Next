// Nav bar
import React from 'react';
// Built in next link component
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

const Nav = () => {
   return (
      <nav className={navStyles.nav}>
         <ul>
            <li>
               <Link href="/">Home</Link>
            </li>
            <li>
               <Link href="/about">About</Link>
            </li>
            <li>
               <Link href="/">Animals</Link>
            </li>
            <li>
               <Link href="/about">Breeds</Link>
            </li>
         </ul>
      </nav>
   );
};

export default Nav;
