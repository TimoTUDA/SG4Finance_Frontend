import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Wrapper Component for Navigation Functionalities
 *
 * Usage: export default withRouter(COMPONENT)
 * then navigation is available in props
 */
export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const navigate = useNavigate();
		const location = useLocation();

		return <Component navigate={navigate} {...props} {...location.state} />;
	};

	return Wrapper;
};
