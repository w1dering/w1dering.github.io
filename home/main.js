class Website {
	constructor(name, url, background_image) {
		this.name = name;
		this.url = url;
		this.bg = background_image;
	}
}

const websites = [
	new Website("Canvas", "https://w1dering.github.io/canvas/canvas.html", "canvas.png"),
	new Website("Sacabambaspis", "https://w1dering.itch.io/sacabambaspis", "sacabambaspis.png"),
];

const bodyDiv = document.getElementById("body");

for (let website of websites) {
    const websiteBtn = document.createElement("button");
    websiteBtn.classList.add("website");

    websiteBtn.style.backgroundImage = `url(imgs/${website.bg})`;
    websiteBtn.href = website.url;
    
    bodyDiv.appendChild(websiteBtn); 
}