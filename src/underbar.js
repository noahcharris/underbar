/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n === undefined) {
      return array[0];
    } else {
      return array.slice(0,n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length-1];
    } else if (n>array.length) {
      return array.slice(0);
    } else {
      var x = array.length - n;
      return array.slice(x)
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0;i<collection.length;i++)
        iterator(collection[i], i, collection);
    } else {
      for (var element in collection)
        iterator(collection[element], element, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    /*
    var f = function(value, key, collection) {
      if (value === target)
        return key;
      if ((key === collection.length) && (value != target))
        return -1;
    };

    _.each(array, f);
    */
    for (var i=0;i<array.length;i++) {
      if (array[i] === target)
        return i;
      if (i === array.length-1 && array[i] != target)
        return -1;
    }
    
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  };


  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {

    var temp = [];
    _.each(collection, function(item) {
      if (iterator(item))
        temp.push(item);
    });
 
    return temp;

  };


  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var temp = [];
    if (Array.isArray(collection)) {
      for (var i=0;i<collection.length;i++) {
        if (!iterator(collection[i])) {
          temp.push(collection[i]);
        }
      }
    } else {
      for (var key in collection) {
        if (!iterator(collection[key]))
          temp.push(collection[key]);
      }
    }

    return temp;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var temp = [];
    for (var i=0;i<array.length;i++) {
      if (temp.indexOf(array[i]) == -1)
        temp.push(array[i]);
    }
    return temp;

  };



  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {

    /*

    _.each(array, function(item) {


    });
*/



    
    var temp = array.slice(0);
    for (var i=0;i<array.length;i++) {
      temp[i] = iterator(temp[i]);
    }
    return temp;
    
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {

    var temp = list.slice(0);  //Why do I need to do this??
    
   // if (Array.isArray(list)) {
   //   for (var i=0;i<list.length;i++) {
   //     //console.log(list[i]);
   //     temp[i][methodName](args);
   //   }
   // }
    if (typeof methodName === 'function') {
      _.each(temp, function(a) {
        methodName.apply(a, args); //TODO
      });
    }


    if (typeof methodName === 'string') {
      _.each(temp, function(x) {
        x[methodName](args);
      });
    }


  

    return temp;

  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var previous = 0;
    if (initialValue)
      previous = initialValue;
    

    _.each(collection, function(value) {
      previous = iterator(previous, value);
    });


    return previous;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined)
      return true;
    return _.reduce(collection, function(previous, item) {
      if (!previous)
        return false;
      if (iterator(item))
        return true;
      return false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (!collection.length)
      return false;
    if (iterator === undefined) {
      iterator = function(x) {
        return x;
      }
    }


    return _.reduce(collection, function(previous, item) {
      if (previous)
        return true;
      if (iterator(item))    
        return true;
      return false;
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) { //How do I use multiple sources in a different way?
    var arrayOfObjects = Array.prototype.slice.call(arguments,1);
    _.each(arrayOfObjects, function(o) {
      for (var key in o) {
        obj[key] = o[key];
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    var arrayOfObjects = Array.prototype.slice.call(arguments, 1);

    _.each(arrayOfObjects, function(o) {
      for (var key in o) {
        if(!obj.hasOwnProperty(key))
          obj[key] = o[key];
      }
    });

   // for (var key in input) {
   //   if (!obj.hasOwnProperty(key))
   //     obj[key] = input[key];
   // }
 
    return obj;
  };



  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var store = {};
    var result;

    return function() {

      if (Object.keys(store).indexOf(arguments[0]) != -1) {
        return store[arguments[0]];
      } else {
        result = func.apply(this, arguments);
        store[arguments[0]] = result;
        return result;
      }


    };
    console.log(func(n));
    if (Object.keys(results).indexOf(arguments[0]) != -1) {
      return results[arguments[0]];
    } else {
      r = func.apply(this, arguments);
      results[arguments[0]] = r;
      return r;
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

      var args = Array.prototype.slice.call(arguments);
      var newArgs = args.slice(2);
      setTimeout(function() { func.apply(this, newArgs) }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var temp = array.slice(0);
    var j;
    for (var i=0;i<array.length*3;i++) {
      j = Math.floor((Math.random() * array.length));
      var x = temp.splice(j, 1);
      temp.push(x[0]);
    }
    return temp;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  //TODO: account for when an array and a string are passed in
  _.sortBy = function(collection, iterator) {

    var x, y;

    var f = function compare(a, b) {
       //Going to call this recursively for the comparing objects
      if (typeof a === 'string') {
        if (a.length>b.length)
          return 1;
        if (a.length<b.length)
          return -1;
        return 0;
        
      } else if (typeof a === 'number') {
        if (a>b)
          return 1;
        if (a<b)
          return -1;

        return 0;

      } else if (typeof a === 'object') {
        if (typeof arguments[1] === 'string') {
          x = a[iterator];
          y = b[iterator];
        } else {
          x = iterator(a);
          y = iterator(b);
        }

        return compare(x, y);
      }
    }
    collection.sort(f);
    return collection;

  };


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var temp = [];
    var arrays = Array.prototype.slice.call(arguments);
    var max = 0;

    for (var i=0;i<arrays.length;i++) {
      if (arrays[i].length > max)
        max = arrays[i].length;
    }

    for (var i=0;i<max;i++) {
      var t = [];
      for (var j=0;j<arrays.length;j++) {
        if (arrays[j][i]) {
          t.push(arrays[j][i]);
        } else {
          t.push(undefined);
        }
      }
      temp.push(t);
    }
    return temp;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var temp = [];
    function recurse(array) {
      for (var i=0;i<array.length;i++) {
        if (Array.isArray(array[i])) {
          recurse(array[i]);
        } else {
          temp.push(array[i]);
        }
      }
    }
      recurse(nestedArray);
      return temp;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var temp = [];
    var current;
    var arrays = Array.prototype.slice.call(arguments);
    for (var i=0;i<arrays[0].length;i++) {
      current = arrays[0][i];
      for (var j=0;j<arrays.length;j++) {
        if (arrays[j].indexOf(current) === -1)
          break;
        if (j === arrays.length-1)
          temp.push(arrays[0][i]);
      }
    }
    return temp;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var temp = [];
    var current;
    var arrays = Array.prototype.slice.call(arguments);
    for (var i=0;i<arrays[0].length;i++) {
      current = arrays[0][i];
      for (var j=1;j<arrays.length;j++) {
        if (arrays[j].indexOf(current) != -1)
          break;
        if (j === arrays.length-1)
          temp.push(arrays[0][i]);
      }
    }
    return temp;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);

