const Embedly = require('embedly');

function renderMp3HTML(embedURL) {
  return Promise.resolve(`<audio src="${ embedURL }" controls></audio>`);
}

function renderEmbedlyHTML(embedURL) {
  let api = new Embedly({ key: process.env.EMBEDLY_KEY });

  return new Promise((resolve, reject) => {
    api.oembed({ url: embedURL }, (error, [ { html } ]) => {
      if (error) { reject(error); }
      return resolve(`<div class="embed">${ html }</div>`);
    });
  });
}

// NOTE: Eleventy shortcodes are much simpler to use than this. However, they don't support promises
// or callbacks, so we're stuck using the more verbose as a workaround.
// https://github.com/11ty/eleventy/issues/429
function renderHTML(embedURL) {

  if (/\.mp3$/i.test(embedURL)) {
    return renderMp3HTML(embedURL);
  }

  return renderEmbedlyHTML(embedURL);
}

module.exports = (nunjucksEngine) => {

  return {
    tags: [ "embedly" ],

    parse(parser, nodes) {
      let token = parser.nextToken();
      let args = parser.parseSignature(null, true);

      parser.advanceAfterBlockEnd(token.value);
      return new nodes.CallExtensionAsync(this, "run", args);
    },

    run(context, embedURL, callback) {
      renderHTML(embedURL).then((html) => {
        callback(null, new nunjucksEngine.runtime.SafeString(html));
      });
    }
  };
};
