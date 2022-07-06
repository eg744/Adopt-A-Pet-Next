import styles from '../styles/Layout.module.css';
import Nav from '../components/Nav';
import Header from '../components/Header';

// General layout for every page

const Layout = ({ children }) => {
   return (
      <div>
         {/* Navbar component */}
         <Nav />
         {/* Classname allows for styling */}
         <div className={styles.container}>
            <main className={styles.main}>
               <Header />
               {/* Page content */}
               {children}
            </main>
         </div>
      </div>
   );
};
export default Layout;
