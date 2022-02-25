module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: data => "Article",
      parent: data => "Blog",
      title: data => data.title
    }
  }
}