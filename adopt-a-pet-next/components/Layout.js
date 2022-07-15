import layoutStyles from '../styles/Layout.module.css';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

// General layout for every page

const Layout = ({ children }) => {
	return (
		<div>
			{/* Navbar component */}
			<Nav />
			{/* Classname allows for styling */}
			<div className={layoutStyles.container}>
				<main className={layoutStyles.main}>
					<Header />
					{/* Page content */}
					{children}
				</main>
			</div>
			<Footer />
		</div>
	);
};
export default Layout;
