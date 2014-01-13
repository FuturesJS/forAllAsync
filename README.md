forAllAsync
===

Basically a `forEachAsync` that allows `n` async calls at once.

Another way to think of it is as a thread pool for JavaScript.

Say you have 500 http requests that you want to get done
10 at a time and then know when they've all finished...
then `forAllAsync` is your guy!

Installation
---

Node.JS (Server):

```bash
npm install forAllAsync
```

Browser Installation
===

You can install from bower:

```bash
bower install forAllAsync
```

Or download the raw file from <https://raw.github.com/FuturesJS/forAllAsync/master/forAllAsync.js>:

```bash
wget https://raw.github.com/FuturesJS/forAllAsync/master/forAllAsync.js
```

Or build with pakmanager:

```bash
pakmanager build forAllAsync
```

Usage
---

```javascript
;(function (exports) {
  'use strict';

  var forAllAsync = exports.forAllAsync || require('forAllAsync').forAllAsync
    , maxCallsAtOnce = 4 // default
    , arr
    ;

  function onEach(complete, item, i) {
    setTimeout(function () {
      console.log(item);
      complete();
    }, 500);
  }

  arr = ['a', 'b', 'c', 'd'];
  forAllAsync(arr, onEach, maxCallsAtOnce).then(function () {
    console.log('did all the things');
  });
}('undefined' !== typeof exports && exports || new Function('return this')())));
```
    
API
---

  * `forAllAsync(array, iterator, n).then(callback)`
    * execute `iterator` for each element in `array`, `n` at a time and call `callback` when all are complete
