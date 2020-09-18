const utility = require('utility');
const SALT_STR = '!@#$%%.shwuq1212?//';
/**
 * @description md5 + salt
 * @param {String} str String to be encrypted
 * @return {String}
 */
exports.md5 = function(str) {
    return utility.md5(utility.md5(utility.md5(str+SALT_STR)));
};