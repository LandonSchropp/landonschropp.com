import voca from 'voca';

import addAsyncShortcode from './extensions/add-async-shortcode';
import baseURL from './filters/base-url';
import includeLandingPageSVG from './shortcodes/include-landing-page-svg';
import log from './shortcodes/log';
import listify from './filters/listify';
import notesCollection from './collections/notes-collection';
import required from './filters/required';

// TODO: Figure out how to move the root pages into a separate `pages` directory.
export default function configureEleventy(eleventyConfig) {

  // TODO: Remove this when Eleventy adds official support for promises in shortcodes.
  eleventyConfig.addAsyncShortcode = addAsyncShortcode;

  // Set the layout aliases
  eleventyConfig.addLayoutAlias("default", "layouts/layout.njk");
  eleventyConfig.addLayoutAlias("note", "layouts/note.njk");

  // Add the custom filters
  eleventyConfig.addFilter("titleCase", voca.titleCase);
  eleventyConfig.addFilter("trim", voca.trim);
  eleventyConfig.addFilter("listify", listify);
  eleventyConfig.addFilter("required", required);
  eleventyConfig.addFilter("baseURL", baseURL);

  // Add the custom shortcodes
  eleventyConfig.addShortcode("log", log);
  eleventyConfig.addAsyncShortcode("includeLandingPageSVG", includeLandingPageSVG);

  // Add the custom collecitons
  eleventyConfig.addCollection("notes", notesCollection);

  return {
    dir: {
      input: "source",
      output: "build",
      includes: "includes",
      data: "data"
    }
  };
}
