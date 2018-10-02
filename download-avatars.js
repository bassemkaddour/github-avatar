var request = require('request');
var token = require('./secrets');
var fs = require('fs');

var repoOwnerInput = process.argv[2];
var repoNameInput = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

//checks for valid command line input, header with authorization token,
function getRepoContributors(repoOwner, repoName, cb) {
  if(!repoOwner || !repoName) {
    console.error('Please specify a reop onwer and a repo name!');
    return false;
  }

  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' + token.GITHUB_TOKEN
    }
  };


  request(options, function(err, response, body) {
    var result = JSON.parse(body);
    cb(err, result);
  });
}

//creates path, and calls download function on appropriate image url
function makePath(err, result) {
  if (err) {
    console.log('Error occurred:', err);
  }

  result.forEach( function (elem) {
    var path = './avatars/' + elem.login + '.jpg';
    downloadImageByURL(elem.avatar_url, path);
  });

  console.log('Your images have been downloaded to the avatars directory!');
}

//writing image to folder
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}


getRepoContributors(repoOwnerInput, repoNameInput, makePath);
