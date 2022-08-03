import React from 'react';

function InputField() {
	return (
		<div>
			<label for="animal" name="animal">
				Search for an animal
			</label>
			<input
				type="text"
				id="animal"
				placeholder="Search for an animal"
				autoComplete="off"
				spellCheck="false"
			></input>
		</div>
	);
}

export default InputField;
