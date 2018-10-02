var request = require('request');
var token = require('./secrets')

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
    console.log(result);
    cb(err, result);
  });
}

getRepoContributors('jquery', 'jquery', function (err, result) {
  console.log('Errors:', err);
  console.log('Result:', result.forEach( function (elem) {
    console.log(elem.avatar_url);
  }));
});