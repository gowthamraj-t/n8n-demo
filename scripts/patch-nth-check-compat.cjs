const fs = require('fs');
const path = require('path');

const cssSelectPseudosPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'svgo',
  'node_modules',
  'css-select',
  'lib',
  'pseudos.js'
);

if (!fs.existsSync(cssSelectPseudosPath)) {
  process.exit(0);
}

const source = fs.readFileSync(cssSelectPseudosPath, 'utf8');
const oldRequire = 'var getNCheck = require("nth-check");';
const newRequire = [
  'var getNCheckModule = require("nth-check");',
  'var getNCheck = getNCheckModule.default || getNCheckModule;',
].join('\n');

if (source.includes(newRequire)) {
  process.exit(0);
}

if (!source.includes(oldRequire)) {
  throw new Error(
    `Unable to patch nth-check compatibility in ${cssSelectPseudosPath}: expected require was not found.`
  );
}

fs.writeFileSync(cssSelectPseudosPath, source.replace(oldRequire, newRequire));
