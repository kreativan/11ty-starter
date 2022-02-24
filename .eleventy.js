const { DateTime } = require("luxon");

//
// 11ty Image 
//
const Image = require("@11ty/eleventy-img");
async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp", "jpeg"]
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

//
//  Config
//
module.exports = function(eleventyConfig) {

  // Passthrough copy files and watch targets
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addWatchTarget("./src/assets/");

  // {% image "./src/images/cat.jpg", "my photo" %}
  // {% image "./src/images/cat.jpg", "my photo", "(min-width: 30em) 50vw, 100vw" %}
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  // css, js files cache buster timestamp
  // {{ '/assets/script.js' | buster }}
  eleventyConfig.addFilter("buster", function(value) {
    return value + "?" + Date.now();
  });

  /* Luxon Date Filter {{ item.date | luxonDate }} */
  eleventyConfig.addFilter("luxonDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });

  /* Year Shortcode {% year %} */
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Get only content that matches a tag 
  eleventyConfig.addCollection("blogFeatured", function(collectionApi) {
    return collectionApi.getFilteredByTags('blog', 'featured');
  });
  

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };

}