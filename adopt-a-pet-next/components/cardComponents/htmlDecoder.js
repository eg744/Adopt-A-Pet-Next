// Helper function unescapes html string to catch and convert to human friendly html in returned div

// When deploying, this module can't be found for some reason. I'll look more into it, but I'm including the function in other components that need it for now.
const htmlDecode = (content) => {
	let div = document.createElement('div');
	div.innerHTML = content;
	return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
};
export default htmlDecode;
