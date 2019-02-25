const embedly = require('./lib/embedly');
const validateNote = require('./lib/validate-note')

// TODO: Figure out how to move the root pages into a separate `pages` directory.
module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias("default", "layouts/layout.njk");
  eleventyConfig.addLayoutAlias("note", "layouts/note.njk");

  eleventyConfig.addNunjucksTag("embedly", embedly);

  eleventyConfig.addCollection("notes", (collection) => {

    // Grab all of the notes
    let notes = collection.getFilteredByGlob("source/notes/**/*");

    // Validate all of the notes to make sure I didn't accidentally leave something out.
    notes.forEach(validateNote);

    // Return the notes
    return notes;
  });

  return {
    dir: {
      input: "source",
      output: "build",
      includes: "includes"
    },
  };
};
