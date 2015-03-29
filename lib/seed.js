var loader = require('mongo-loader');

module.exports = function (callback) {
    loader.import( function () {
        console.log('done');
        callback();
    });  
}
