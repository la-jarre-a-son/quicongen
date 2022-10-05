const pkg = require('./package.json');
const DEFAULT_PRESET_LIST = require('./src/defaults/presetList.json');

const authorMatch = pkg.author.match(/^([^\(]+)\((.+)\)$/);
const AUTHOR_NAME = authorMatch && authorMatch[1].trim();
const AUTHOR_URL = authorMatch && authorMatch[2].trim();
const repositoryMatch = pkg.repository.match(/^github:(.+)$/);
const GITHUB_REPOSITORY = repositoryMatch && repositoryMatch[1].trim();
const LOGO = DEFAULT_PRESET_LIST[0].preview;

module.exports = {
  plugins: {
    'posthtml-expressions': {
      locals: {
        VERSION: pkg.version,
        TITLE: pkg.title,
        DESCRIPTION: pkg.description,
        KEYWORDS: pkg.keywords.join(','),
        HOMEPAGE: pkg.homepage,
        AUTHOR_NAME,
        AUTHOR_URL,
        GITHUB_REPOSITORY,
        LOGO,
      },
    },
  },
};
