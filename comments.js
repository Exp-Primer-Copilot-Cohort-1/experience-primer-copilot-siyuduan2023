// Create web server
// Run: node comments.js
// Open browser: http://localhost:3000

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var comments = require('./comments');

var server = http.createServer(function(req, res) {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/comments.json') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(comments));
        res.end();
    } else if (req.url === '/comments.html') {
        fs.readFile('./comments.html', function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/comments.js') {
        fs.readFile('./comments.js', function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/comments.css') {
        fs.readFile('./comments.css', function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/css'
            });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/comments') {
        if (req.method === 'POST') {
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                comments.push(JSON.parse(body));
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(comments));
                res.end();
            });
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('404 Not Found');
        res.end();
    }
});

server.listen(3000, function() {
    console.log('Server running at http://localhost:3000');
});