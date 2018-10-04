const path = require('path');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');

require('dotenv').config({ path: path.resolve(__dirname, `./env/${process.env.ENV_FILE}`) });

const { STATIC_PATH } = process.env;

module.exports = withTypescript(withSass({
  publicRuntimeConfig: {
    STATIC_PATH,
  }
}));
