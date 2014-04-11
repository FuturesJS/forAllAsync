(function () {
  "use strict";

  var forAllAsync = require('./forAllAsync').forAllAsync
    , arr = 'abcdefghijklmnopqrstuvwxyz'.split('')
    , arr2 = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
    ;

  forAllAsync([], function () {
    throw new Error("Empty array shouldn't be called");
  }, 4).then(function () {
    console.log('finished empty batch');
  });

  forAllAsync(arr2, function (complete, item) {
    console.log(item);
    complete();
  }, 4).then(function () {
    console.log('finished uppercase batch', arr2.length);
  });

  forAllAsync(arr, function (complete, item, i) {
    var timeout = Math.round(Math.random() * 1000);
    setTimeout(function () {
      console.log(item, i, timeout);
      complete();
    }, timeout);
  }, 4).then(function () {
    console.log('finished lowercase batch', arr.length);
  });
}());
