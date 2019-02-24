// Ensure the proper environment variables are provided
if (!process.env.URL || !process.env.NODE_ENV || !process.env.PORT || !process.env.EMBEDLY_KEY) {
  process.stderr.write(
    "You must provide NODE_ENV, PORT, URL and EMBEDLY_KEY environments variables."
  );

  process.exit(1);
}

// Load the tasks. This must be done manually because Gulp doesn't support referencing tasks that
// haven't been loaded yet. https://github.com/gulpjs/gulp/issues/802
import './gulp/tasks/clean';
import './gulp/tasks/static';
import './gulp/tasks/html';
import './gulp/tasks/images';
import './gulp/tasks/stylesheets';
import './gulp/tasks/javascript';
import './gulp/tasks/build';
import './gulp/tasks/watch';
import './gulp/tasks/deploy';
