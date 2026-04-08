const fileItems = [
	{ title: "Taxes 2025.pdf", meta: "1.2 MB" },
	{ title: "School Notes.docx", meta: "430 KB" },
	{ title: "Project Plan.xlsx", meta: "980 KB" },
	{ title: "Medical Records.zip", meta: "5.6 MB" }
];

export default function FilesSection() {
	return (
		<section className="media-row">
			<div className="media-row-head">
				<h2>Files</h2>
			</div>

			<div className="media-grid">
				{fileItems.map((item) => (
					<article key={item.title} className="media-card media-card-file">
						<div className="media-card-sheen" />
						<h3>{item.title}</h3>
						<p>{item.meta}</p>
					</article>
				))}
			</div>
		</section>
	);
}
