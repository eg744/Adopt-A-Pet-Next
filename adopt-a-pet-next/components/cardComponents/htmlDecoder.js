// Helper function unescapes html string to catch and convert to human friendly html in returned div
const htmlDecode = (content) => {
	let div = document.createElement('div');
	div.innerHTML = content;
	return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
};
export default htmlDecode;
