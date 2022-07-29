import layoutStyles from '../styles/Layout.module.css';
import Nav from './Navbar/Nav.js';
import Header from '../components/Header';
import Footer from '../components/Footer';

// General layout for every page

const Layout = ({ children }) => {
	return (
		<div>
			{/* Navbar component */}
			<Nav />
			<div className={layoutStyles.container}>
				<main className={layoutStyles.main}>
					{/* <Header /> unsure about header */}
					{/* Page content */}
					{children}
				</main>
			</div>
			<Footer />
		</div>
	);
};
export default Layout;
