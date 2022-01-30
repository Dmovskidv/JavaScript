'use strict';

const path = require('path');
const fs = require('fs/promises');
const { isDirectory, WINDOWS_DIR_PATH_REG_EXP } = require('./utils');


const readDirectory = async (dirPath) => {
  const isAbsolutePath = WINDOWS_DIR_PATH_REG_EXP.test(dirPath);
  let directory;  
  if (isAbsolutePath) {
    directory = dirPath;
  } else {
    directory = path.resolve(__dirname, '..', 'files');
    if (dirPath) {
      directory = path.join(directory, dirPath);
    }
  }
  const files = await fs.readdir(directory);
  const directoryInfo = await Promise.all(files.map(async fileName => {
    const fullPath = path.join(directory, fileName);
    return {
      name: fileName,
      isDirectory: await isDirectory(fullPath)
    };
  }));
  return directoryInfo;
};

module.exports = function(app) {
  app.get('/file-manager/api/files', async (req, res) => {
    try {      
      const directoryInfo = await readDirectory(req.query.path);  
      res.send(directoryInfo);      
    } catch (err) {
      console.error('Unable to fetch list of files', err);
      res.send(err);
    }
  });
}