import { useEffect, useState } from "react";

export default function PhotoSection({ userPhotos, setUserPhotos }) {
	console.log("Photo Items:", userPhotos);
		return (
			<section className="media-row">
				<div className="media-row-head">
					<h2>Photos</h2>
				</div>

				<div className="media-grid">
					{userPhotos && userPhotos.map((item) => (
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
