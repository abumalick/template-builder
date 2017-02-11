// eslint-disable
const files = [
  'forq-annonces',
  'forq-audios',
  'forq-email',
];

const templates = {};
files.forEach(file => (
  templates[file] = require(`./${file}`).default // eslint-disable-line
));

export default templates;

