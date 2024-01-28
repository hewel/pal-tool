import * as cheerio from "cheerio";

const WIKI_BASE_URL = "https://palworld.wiki.gg";

export const getPals = async () => {
	const html = await fetch(`${WIKI_BASE_URL}/wiki/Pals`).then((res) =>
		res.text(),
	);
	const $ = cheerio.load(html);
	const data = $(".wikitable tbody")
		.find("tr")
		.toArray()
		.map((el) => {
			const [name, number, _, element] = $(el).find("td").toArray();
			const $name = $(name);
			return {
				name: $name.text().trim(),
				wikiLink: `${WIKI_BASE_URL}${$name.find("a").attr("href")}`,
				icon: `${WIKI_BASE_URL}${$name.find("a img").attr("src")}`,
				number: $(number).text().trim(),
				element: $(element)
					.text()
					.trim()
					.split("/")
					.map((e) => e.trim()),
			};
		});
	return data;
};
