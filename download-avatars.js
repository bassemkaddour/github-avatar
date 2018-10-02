var request = require('request');
var token = require('./secrets')
var fs = require('fs');

var repoOwnerInput = process.argv[2];
var repoNameInput = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' + token.GITHUB_TOKEN
    }
  };


  request(options, function(err, response, body) {
    var result = JSON.parse(body)
    cb(err, result);
  });
}



getRepoContributors(repoOwnerInput, repoNameInput, function (err, result) {
  console.log('Errors:', err);
  console.log('Result:', result.forEach( function (elem) {
    var path = './avatars/' + elem.login + '.jpg';
    downloadImageByURL(elem.avatar_url, path);
  }));
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })

    .on('response', function (response) {
      console.log('Responded', response.statusCode)
    })

    .pipe(fs.createWriteStream(filePath));

}

