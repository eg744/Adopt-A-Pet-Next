import articleStyles from '../styles/Article.module.css';
import ArticleItem from './ArticleItem.js';

// Children have key ids https://reactjs.org/docs/lists-and-keys.html#keys

// Articles prop from api call in index.js
const ArticleList = ({ articles }) => {
	const articleItems = articles.map((article) => (
		<ArticleItem key={article.id.toString()} article={article} />
	));
	/* Contain with () Not {} when using .map here */

	return <div className={articleStyles.grid}>{articleItems}</div>;
};

export default ArticleList;

// const AnimalList = (props) =>{

// }
