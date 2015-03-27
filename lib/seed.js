var loader = require('mongo-loader');

module.exports = function () {
    loader.import( function () {
        console.log('done');
    });  
}
