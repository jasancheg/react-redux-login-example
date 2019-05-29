/**
 * ./src/components/alert/index.js
 */

import React from 'react';

const Alert = ({ type = 'success', children }) => (
	<div className="col col-sm-12">
		<div className={`alert alert-${type}`}>
			{children}
		</div>
	</div>
);

export default Alert;