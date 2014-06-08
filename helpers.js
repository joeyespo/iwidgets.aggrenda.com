// helpers.js
// Helper library.


/**
 * Overwrites obj1's values with obj2's.
 * @param obj1
 * @param obj2
 * @returns obj1
 */
function mergeInto(obj1, obj2) {
    for (var attrname in obj2) {
        obj1[attrname] = obj2[attrname];
    }

    return obj1;
}


/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge(obj1, obj2) {
    var obj3 = {};

    mergeInto(obj3, obj1);
    mergeInto(obj3, obj2);

    return obj3;
}


exports.mergeInto = mergeInto;
exports.merge = merge;
