xms
===

CMS for node.js to be plugged into a express app. This is a work in progress, for full usage see test/manual folder for functional example.

```
var express = require('express');
var app = express();
var xms = require('xms');
xms.extend(app);
```