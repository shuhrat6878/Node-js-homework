const { URL } = require('url');

const Url = new URL('https://example.com:8080/path/name?search=query&sort=asc#section1');

console.log(Url.host); 
console.log(Url.pathname); 

Url.searchParams.forEach((value, key) => {
    console.log(`  ${key}: ${value}`);
});

console.log(Url.hash); 
