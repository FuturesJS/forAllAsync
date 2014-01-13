/*jshint -W054 */
;(function (exports) {
  'use strict';

  // should be more like sequence than join
  function forAllAsync(arr, fn, nThreads) {
    // how many threads are allowed
    nThreads = nThreads || 4;

    var cbs = []
      // how many threads are underway
      , begun = 0
      // how many have been run
      , finished = 0
      ;

    function onFinishedBound() {
      finished += 1;
      onNextBound();
    }
    function onNextBound() {
      if (0 === arr.length && finished === begun) {
        complete();
      }
      while (arr.length && (begun - finished) < nThreads) {
        begun += 1;
        fn(onFinishedBound, arr.shift(), begun - 1, arr);
      }
    }
    function complete() {
      cbs.forEach(function (cb) {
        cb();
      });
      cbs = [];
    }

    onNextBound();

    return {
      then: function (cb) {
        cbs.push(cb);
        onNextBound();
        return this;
      }
    };
  }

  exports.forAllAsync = forAllAsync;
}('undefined' !== typeof exports && exports || new Function('return this')()));
