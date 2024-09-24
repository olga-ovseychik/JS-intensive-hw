Array.prototype.myFilter = function(callbackFn, thisArg) {
    if (typeof callbackFn !== 'function') {
        throw new TypeError(`${callbackFn} is not a function.`);
    }

    if (!Array.isArray(this)) {
        if (this.length === undefined || this.length === null) {
            throw new TypeError(`Object is not iterable. 'length' property is not defined.`);
        }

        if (Number.isNaN(Number(this.length)) || 
            (Number(this.length) < 0) || 
            (Object.prototype.toString.call(this) === '[object Object]' && 
            (Number(this.length) !== Object.keys(this).length-1))) {
                
            throw new TypeError(`Object is not iterable. 'length' property is an invalid value.`);
        }

        for (let key of Object.keys(this)) {
            if (key === 'length') {
                continue;
            }
            
            if (Number.isNaN(Number(key)) || Number(key) < 0) {
                throw new TypeError(`Object is not iterable. '${key}' key is an invalid value.`);
            } 
        } 
    } 
    
    let filteredArray = [];
    let obj = !Array.isArray(this) ? Object(this) : Object(Object.values(this));

    for (let i = 0; i < obj.length; i++) {
        if (callbackFn.call(thisArg || this, obj[i], i, obj)) {
            filteredArray.push(obj[i]);
        }
    }

    return filteredArray;
}