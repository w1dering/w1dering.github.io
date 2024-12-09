import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import "./Sidebar.css";

const Sidebar = () => {
	const navigate = useNavigate();

	return (
		<div id="sidebar">
			<p>im a sidebar!</p>
			<Button content="home" fn={() => navigate("/")} />
		</div>
	);
};

export default Sidebar;
