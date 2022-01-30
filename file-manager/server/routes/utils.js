'use strict';

const fs = require('fs/promises');

const isDirectory = async path => {
  return (await fs.stat(path)).isDirectory();
};

const WINDOWS_DIR_PATH_REG_EXP = new RegExp(/^([a-z]:((\\|\/|\\\\|\/\/))|(\\\\|\/\/))[^<>:"|?*]+/i);

module.exports = {
  isDirectory,
  WINDOWS_DIR_PATH_REG_EXP
}