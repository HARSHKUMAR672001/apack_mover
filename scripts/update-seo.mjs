import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const root = process.cwd();
const baseUrl = "https://agarwalexpressrelocation.com";
const phone = "8688815001";
const today = "2026-09-20T00:00:00+05:30";

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (name === ".git" || name === "node_modules") return [];
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

function cleanText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function attrEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function titleCaseSlug(value) {
  return value
    .replace(/\.html$/i, "")
    .replace(/index$/i, "")
    .split(/[\/_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function canonicalFor(file) {
  const rel = relative(root, file).replaceAll("\\", "/");
  if (rel === "index.html") return `${baseUrl}/`;
  if (rel.endsWith("/index.html")) return `${baseUrl}/${rel.replace(/index\.html$/, "")}`;
  return `${baseUrl}/${rel}`;
}

function truncate(value, max = 158) {
  if (value.length <= max) return value;
  return value.slice(0, max).replace(/\s+\S*$/, "").replace(/[,.;&:-]+$/, "");
}

function makeDescription(primary) {
  const suffix = ` Safe packing, shifting and vehicle transport by Agarwal Express Relocation. Call ${phone}.`;
  const intro = truncate(primary.replace(/\.+$/, ""), 158 - suffix.length - 1);
  return `${intro}.${suffix}`;
}

function seoTarget(title, file) {
  const inMatch = title.match(/\bin\s+(.+)$/i);
  if (inMatch) return cleanText(inMatch[1]).replace(/\s*[-|].*$/, "");

  const routeMatch = title.match(/\b(?:from\s+)?([A-Za-z\s]+?\s+to\s+[A-Za-z\s]+)(?:\s|\(|-|$)/i);
  if (routeMatch) return cleanText(routeMatch[1]);

  const stripped = title
    .replace(/A\.E\.R\.S Pvt Ltd/gi, "")
    .replace(/Agarwal Express Relocation/gi, "")
    .replace(/Agarwal Packers and Movers/gi, "")
    .replace(/Packers and Movers/gi, "")
    .replace(/Movers and Packers/gi, "")
    .replace(/Pvt Ltd|India|\(|\)|-/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  return stripped || titleCaseSlug(relative(root, file)) || "India";
}

function keywordList(target) {
  return [
    `Packers and Movers in ${target}`,
    `Movers and Packers in ${target}`,
    `Household shifting in ${target}`,
    `Home Relocation in ${target}`,
    `Agarwal Packers and Movers in ${target}`,
    `Packers and Movers Price List in ${target}`,
    `Packers and Movers Contact no & Phone no in ${target}`,
    `Packers and Movers Within City in ${target}`,
    `Top Packers and Movers in ${target}`,
    `Best Packers and Movers in ${target}`,
    `Bike transportation services in ${target}`,
    `Car transportation services in ${target}`,
    `Bike parcel services in ${target}`,
    `Packers and Movers Review in ${target}`,
    `Best Movers in ${target}`,
    `Affordable Packers and Movers in ${target}`,
  ];
}

function metadata(file, html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((match) => cleanText(match[1]))
    .filter((text) => text && !/click to get free quotes/i.test(text));
  const title = cleanText(titleMatch?.[1]) || h1Matches[0] || titleCaseSlug(relative(root, file)) || "Agarwal Express Relocation";
  const primary = h1Matches[0] || title;
  const target = seoTarget(title, file);
  const canonical = canonicalFor(file);
  const depth = relative(root, dirname(file)).split(/[\\/]/).filter(Boolean).length;
  const prefix = depth ? "../".repeat(depth) : "";
  const image = `${baseUrl}/images/logo.png`;
  const description = makeDescription(title);
  const keywords = [
    title,
    ...keywordList(target),
    "Agarwal Express Relocation",
    "packers and movers",
    "movers and packers",
    "house shifting",
    "office relocation",
    "car transportation",
    "India",
  ].join(", ");

  return {
    title,
    target,
    description,
    keywords,
    canonical,
    image,
    prefix,
  };
}

function seoContent(data) {
  const keywords = keywordList(data.target);
  const items = keywords.map((keyword) => `<li>${attrEscape(keyword)}</li>`).join("\n");

  return `<!-- SEO content START -->
<section class="seo-content">
  <div class="container">
    <h2>Packers and Movers in ${attrEscape(data.target)}</h2>
    <p>Agarwal Express Relocation provides ${attrEscape(keywords[0])}, ${attrEscape(keywords[1])}, household shifting, home relocation, office shifting, packing, loading, transport and unloading support for local and domestic moves.</p>
    <p>Customers looking for ${attrEscape(keywords[5])}, contact number, phone number, reviews, bike transportation, car transportation or affordable movers can call ${phone} for quick help and a moving quote.</p>
    <ul>
${items}
    </ul>
  </div>
</section>
<!-- SEO content END -->`;
}

function seoBlock(data) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Agarwal Express Relocation",
    url: data.canonical,
    logo: data.image,
    image: data.image,
    telephone: `+91-${phone}`,
    areaServed: "India",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    serviceType: data.title,
  };

  return `<title>${attrEscape(data.title)}</title>
<meta name="description" content="${attrEscape(data.description)}" />
<meta name="keywords" content="${attrEscape(data.keywords)}" />
<link rel="icon" href="${data.prefix}images/favicon.png" />
<link rel="canonical" href="${data.canonical}" />
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow" />
<meta name="author" content="Agarwal Express Relocation" />
<meta name="language" content="English" />
<meta name="document-type" content="public" />
<meta name="country" content="India" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${attrEscape(data.title)}" />
<meta property="og:description" content="${attrEscape(data.description)}" />
<meta property="og:url" content="${data.canonical}" />
<meta property="og:image" content="${data.image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${attrEscape(data.title)}" />
<meta name="twitter:description" content="${attrEscape(data.description)}" />
<meta name="twitter:image" content="${data.image}" />
<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function replaceHeadSeo(file, html) {
  const data = metadata(file, html);
  const block = seoBlock(data);
  let next = html
    .replace(/<meta\s+name=["']description["']\s+content=["']\s*["']\s*\/?>\s*/gi, "")
    .replace(/<meta\s+name=["']author["']\s+content=["']\s*["']\s*\/?>\s*/gi, "")
    .replace(/<title[\s\S]*?<\/title>/i, "__SEO_BLOCK__")
    .replace(/\s*<meta[^>]+name=["']description["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']keywords["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link[^>]+rel=["']icon["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']robots["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']googlebot["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']author["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']language["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']document-type["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']country["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+property=["']og:[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta[^>]+name=["']twitter:[^>]*>\s*/gi, "\n")
    .replace(/\s*<script[^>]+type=["']application\/ld\+json["'][\s\S]*?<\/script>\s*/gi, "\n");

  if (next.includes("__SEO_BLOCK__")) {
    next = next.replace("__SEO_BLOCK__", block);
  } else {
    next = next.replace(/<head[^>]*>/i, (match) => `${match}\n${block}`);
  }

  next = next
    .replace(/We Area No #1/g, "We are a trusted")
    .replace(/Are No 1 Relocation Company/g, "are a trusted relocation company")
    .replace(/WHY WE ARE BEST FORM OTHER/g, "WHY WE ARE BEST FROM OTHERS")
    .replace(/SAFE AND SECURE MOVIE/g, "SAFE AND SECURE MOVE")
    .replace(/Call us or fill the form for query\s*(<\/h2>)/g, "Call us or fill the form for a moving quote$1")
    .replace(/Call us or fill the form for query\s+/g, "Call us or fill the form for a moving quote ");

  next = next.replace(/\s*<!-- SEO content START -->[\s\S]*?<!-- SEO content END -->\s*/g, "\n");
  const content = seoContent(data);
  if (/<footer[\s>]/i.test(next)) {
    return next.replace(/<footer[\s>]/i, (match) => `${content}\n${match}`);
  }
  return next.replace(/<\/body>/i, `${content}\n</body>`);
}

let changed = 0;
for (const file of htmlFiles(root)) {
  const html = readFileSync(file, "utf8");
  if (!/<head[\s>]/i.test(html)) continue;
  const next = replaceHeadSeo(file, html);
  if (next !== html) {
    writeFileSync(file, next);
    changed++;
  }
}

try {
  const sitemap = join(root, "sitemap.xml");
  const xml = readFileSync(sitemap, "utf8");
  writeFileSync(sitemap, xml.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`));
} catch {}

console.log(`Updated ${changed} HTML files.`);
