import React, { Component, useState } from 'react';

// https://reactjs.org/docs/forms.html
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

class InputField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animal: '',
			location: '',
			attributes: '',
		};
	}
	handleSubmit = (event) => {
		// Do not reload page
		event.preventDefault();

		alert(`${this.state.animal}`);
		// this.setState({});
	};

	handleAnimalChange = (event) => {
		// event.target.value = entered value
		this.setState({
			animal: event.target.value,
		});
	};

	handleLocationChange = (event) => {
		this.setState({
			location: event.target.value,
		});
	};

	render() {
		const { animal, location, attributes } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="animal" name="animal">
						Search for an animal
					</label>
					<input
						type="text"
						value={animal}
						onChange={this.handleAnimalChange}
						id="animal"
						placeholder="Search for an animal"
						autoComplete="off"
						spellCheck="false"
					></input>
				</div>
				<div>
					<label htmlFor="location" name="location">
						Location
					</label>
					<input
						type="text"
						value={location}
						onChange={this.handleLocationChange}
						placeholder="Search with location or zip"
					></input>
				</div>
				{/* <div>
					<label htmlFor="attributes" name="attributes">
						attributes
					</label>
					<select value={attributes}>
						<option value="young">Young</option>
						<option value="male">male</option>
					</select>
				</div> */}
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default InputField;
