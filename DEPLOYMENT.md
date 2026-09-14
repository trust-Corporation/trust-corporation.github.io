# Publishing and search setup

This is a static website. No build or package installation is required. Open index.html locally, or publish the repository with GitHub Pages. Keep the css, js and images directories alongside the HTML file.

## Public URL

The canonical origin is https://trust-corporation.github.io/, preserved from the original site. This is the expected URL for a repository named trust-corporation.github.io owned by that account or organization.

A project repository named bolt normally uses https://trust-corporation.github.io/bolt/. If that is the final URL, update every absolute site URL in index.html, robots.txt and sitemap.xml to include /bolt/. This includes JSON-LD identifiers, product URLs and social preview images. Leave relative image, CSS and JS paths unchanged.

For a project site, robots.txt is discovered at the host root, not at /bolt/robots.txt. Submit the project sitemap directly in the search consoles and coordinate host-root crawler rules if needed.

## After publishing

1. Confirm the final public URL and HTTPS access. A local file page and a public code repository alone are not a published website.
2. Add the final site to Google Search Console and Naver Search Advisor. Use the verification token or verification file issued by each service; no token has been fabricated or added here.
3. Submit the sitemap at the final public URL and request indexing of the home page. Inspect indexing reports after crawling.
4. Confirm canonical URLs, social images, image links and structured data at the published URL. Structured data does not guarantee a rich result, indexing or a ranking position.

## Content to obtain from the business

- Verified legal business name, address, representative and business registration details approved for publication.
- Actual product dimensions, materials, hardness or tolerances if available, supported surface treatments, minimum quantities and packaging conditions.
- Confirmed manufacturing and delivery terms. No invented stock, certifications, reviews, prices or delivery guarantees are included.

The three product families have dedicated static pages under products/. Keep their specifications, inquiry guidance, home-page links and sitemap.xml consistent when updating content. Search engine registration steps are in SEARCH-SETUP.md. Avoid duplicate pages for spelling variations and keyword stuffing.

Photographs in images/catalog are unchanged copies of the supplied product photographs, with ASCII filenames for reliable static hosting. Originals remain in their original folders. The site uses resized JPEG copies under images/optimized for faster loading. factory.jpg comes from main.jpeg; factory-equipment.jpg comes from main2.jpeg. main3.jpeg is not used.

## References

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://searchadvisor.naver.com/guide/seo-basic-intro
