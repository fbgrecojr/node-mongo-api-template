# HTTP Response codes for NodeJs

Module to export all the HTTP response codes as constants

Helps you on returning proper response codes in your node application without manually defining every code you need to use.

Better code readability with constant names instead of numbers only. Auto-complete functionality should be able to suggest the code names you are looking for.

## Installation

Install using  `npm install http-response-codes`

## Usage

```
let ERROR_CODE = require('httpResponseCodes');

console.log(ERROR_CODE.HTTP_NOT_FOUND);     // Outputs code '404' as integer
console.log(ERROR_CODE.HTTP_UNAUTHORIZED);  // Outputs code '401' as integer

```


