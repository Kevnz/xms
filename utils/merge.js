var hasOwn   = Object.prototype.hasOwnProperty;
var merge = function () {
    var i      = 0,
        len    = arguments.length,
        result = {},
        key,
        obj;
 
    for (; i < len; ++i) {
        obj = arguments[i];
 
        for (key in obj) {
            if (hasOwn.call(obj, key)) {
                result[key] = obj[key];
            }
        }
    }
 
    return result;
};

exports.merge = merge;