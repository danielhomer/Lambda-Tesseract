'use strict';

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

const exec = require('child_process').exec;
const execDir = process.env['LAMBDA_TASK_ROOT'] + '/Tesseract-CentOS'
const executable = 'tesseract'
const defines = 'LD_LIBRARY_PATH=' + execDir + '/lib TESSDATA_PREFIX=' + execDir;
const args = '';

exports.handler = (event, context, callback) => {
    let command = defines + ' ' + execDir + '/' + executable;
    let args = 'test.png stdout';
    
    exec(command + ' ' + args, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      
      callback(null, stdout);
    });
};