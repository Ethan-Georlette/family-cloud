const photoItems = [
	{ title: "Beach Trip", meta: "42 photos" },
	{ title: "Birthday Party", meta: "58 photos" },
	{ title: "Sunday Picnic", meta: "23 photos" },
	{ title: "Winter Album", meta: "36 photos" }
];

export default function PhotoSection() {
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
						<p>{item.meta}</p>
					</article>
				))}
			</div>
		</section>
	);
}
