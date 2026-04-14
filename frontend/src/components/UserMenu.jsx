import React from "react";

export default function UserMenu({ isOpen, onLogout }) {
	if (!isOpen) return null;

	return (
		<div className="user-menu">
			<button type="button" onClick={onLogout}>Logout</button>
		</div>
	);
}
