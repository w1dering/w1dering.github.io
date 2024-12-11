export default function getColourFromRating(rating: number): string {
	switch (rating) {
		case 1:
			return "#6E6BA2";
		case 2:
			return "#8B93BF";
		case 3:
			return "#8096ED";
		case 4:
			return "#8DC2ED";
		case 5:
			return "#7AD2BF";
		default:
			return "#C9C9C9";
	}
}
