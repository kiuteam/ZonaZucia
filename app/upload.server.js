/**
 * Created by ronald on 14-11-15.
 */
'use strict';

var request = require('request');
var mongoose = require('mongoose');

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

exports.create = function(req, res) {
    var part = req.files.image;
    var writeStream = gfs.createWriteStream({
        filename: part.name,
        mode: 'w',
        content_type:part.mimetype
    });
    writeStream.on('close', function(file) {
        return res.status(200).send({
            message: 'Success',
            file: file
        });
    });
    writeStream.write(part.data);
    writeStream.end();
};

exports.location = function(req, res) {
    var uri = 'http://maps.googleapis.com/maps/api/staticmap?center='+req.body.latitude+','+req.body.longitude+'&format=jpg&size=200x200&zoom=17&markers=color:blue%7Clabel:S%7C'+req.body.latitude+','+req.body.longitude;
    console.log(uri);

    request.head(uri, function(err, resR, body){
        var contenType = resR.headers['content-type'];
        request(uri).pipe(gfs.createWriteStream({
            filename: 'location',
            mode: 'w',
            content_type: contenType
        })).on('close', function(file) {
            return res.status(200).send({
                        message: 'Success',
                        file: file
                    });
        });
    });
};


exports.read = function(req, res) {
    console.log(req.params.id);
    var id = gfs.tryParseObjectId(req.params.id);
    gfs.files.find({ _id: id }).toArray(function (err, files) {
        if(files.length===0){
            return res.status(400).send({
                message: 'File not found'
            });
        }
        res.writeHead(200, {'Content-Type': files[0].contentType});
        var readstream = gfs.createReadStream({
            filename: files[0].filename
        });
        readstream.on('data', function(data) {
            res.write(data);
        });
        readstream.on('end', function() {
            res.end();
        });
        readstream.on('error', function (err) {
            console.log('An error occurred!', err);
            throw err;
        });
    });
};