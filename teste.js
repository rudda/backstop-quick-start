var walk    = require('walk');
var files   = [];
var worker = {
    onLoadedmodules : function(callback) {
        console.log(callback);
    }
};
// Walker options
var walker  = walk.walk('test/', { followLinks: false });


    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        files.push(root + '/' + stat.name);
        //console.log('root', root ,'st', stat.name)
        next();
    });    

   walker.on('end', function() {
        //console.log(files);
        files.filter(file=>{
            var a = require('./'+file.substring(0, file.indexOf('.js')));
        })
        worker.onLoadedmodules(files);
    });


module.exports = worker;