import { useEffect, useState } from "react";

export default function PhotoSection() {
	const [photoItems, setPhotoItems] = useState([]);
	const [userData, setUserData] = useState(null);
	for (const file in userData) {
		if (file.contentType && file.contentType.startsWith("image/")) {
			photoItems.push({
				title: file.name,
				url: file.url,
			});
		}
	}
	console.log("Photo Items:", photoItems);
	console.log("Photo Items:", userData);
		return (
			<section className="media-row">
				<div className="media-row-head">
					<h2>Photos</h2>
				</div>

				<div className="media-grid">
					{photoItems.map((item) => (
						<article key={item.title} className="media-card media-card-photo">
							<div className="media-card-sheen" />
							<h3>{item.title}</h3>
							<img src={item.url} alt={item.title} />
						</article>
					))}
				</div>
			</section>
		);
}
