const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
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
  eleventyConfig.addPassthroughCopy("./src/assets/script.js");
  eleventyConfig.addWatchTarget("./src/assets/");
  eleventyConfig.addWatchTarget('./tailwind.config.js');

  /**
   * Eleventy Navigation
   * @example
   * {% set navPages = collections.all | eleventyNavigation %}
   * {% for item in navPages %}...{% endfor %}
   */
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  /**
   * Eleventy Image 
   * @examples
   * {% image "./src/images/cat.jpg", "my photo" %}
   * {% image "./src/images/cat.jpg", "my photo", "(min-width: 30em) 50vw, 100vw" %}
   */
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  /**
   * Buster
   * Add timestamp at the end of the filename.
   * Used to bust browser cache for css and js files
   * @example {{ '/assets/script.js' | buster }}
   */
  eleventyConfig.addFilter("buster", function(value) {
    return value + "?" + Date.now();
  });

  /**
   * Get the base url eg: /blog/post/ => /blog/
   * @example {{ page.url | baseUrl }}
   * @use Used this to add active classes on "parent" element
   * @see navbar.njk
   */
  eleventyConfig.addFilter("baseUrl", function(value) {
    if(!typeof value === "string") return;
    let array = value.split("/");
    if(!array[2]) return value;
    let baseURL = array[1];
    return `/${baseURL}/`;
  });

  /** 
   *  Luxon Date Filter
   *  @example {{ item.date | luxonDate }}
   */
  eleventyConfig.addFilter("luxonDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });

  /**
   * Year Shortcode
   * @example {% year %}
   */
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  /**
   *  Featured blog posts - Custom Collection
   *  Get only content that matches a blog and featured tag 
   *  @example {% for post in blogFeatured.collections  %}...{% endif %}
   */
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