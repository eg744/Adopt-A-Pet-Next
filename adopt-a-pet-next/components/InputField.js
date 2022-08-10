import React, { Component, useState } from 'react';
import Link from 'next/link';

// https://reactjs.org/docs/forms.html
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

// https://stackoverflow.com/questions/43862600/how-can-i-get-query-string-parameters-from-the-url-in-next-js

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
	// May link to animalindex, pass props to grid from here. not sure yet

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
				<Link
					type="submit"
					href={{
						pathname: '/animals',
						query: animal, // the data
					}}
				>
					<button>Go to animal Page</button>
				</Link>
				{/* using link instead <button type="submit">Submit</button> */}
			</form>
		);
	}
}

export default InputField;
