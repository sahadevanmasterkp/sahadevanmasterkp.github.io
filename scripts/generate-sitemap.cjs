const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");

const sections = [
  { url: "#hero", changefreq: "monthly", priority: 1.0 },
  { url: "#about", changefreq: "monthly", priority: 0.9 },
  { url: "#journey", changefreq: "monthly", priority: 0.8 },
  { url: "#gallery", changefreq: "monthly", priority: 0.6 },
  { url: "#footer", changefreq: "monthly", priority: 0.5 },
];

// Generate sitemap
const sitemap = new SitemapStream({
  hostname: "https://sahadevanmasterkp.github.io",
});

streamToPromise(sitemap)
  .then((data) => {
    fs.writeFileSync("./dist/sitemap.xml", data.toString());
    console.log("Sitemap generated successfully!");
  })
  .catch((err) => console.error(err));

// Write each section as a URL fragment
sections.forEach((entry) => sitemap.write(entry));
sitemap.end();
