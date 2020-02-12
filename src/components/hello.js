import React from 'react';

class Hello extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello {this.props.fName} {this.props.lName}</h1>
			</div>
		);
	}
}

export default Hello;