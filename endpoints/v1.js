// this is just the basic endpoints dynamic import file ive made, i just it for like everything
// theres probably a better way to do this but god am i lazy

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function findFilesInSubfolders(directory) {
  const files = [];
  fs.readdirSync(directory, { withFileTypes: true }).forEach((item) => {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      files.push(...findFilesInSubfolders(fullPath));
    } else if (item.isFile() && item.name.endsWith('.js')) {
      files.push(fullPath);
    }
  });
  return files;
}

const v1Directory = path.join(__dirname, 'v1');
findFilesInSubfolders(v1Directory).forEach((filePath) => {
  const route = require(filePath);
  router.use('/v1/', route);
});

module.exports = router;