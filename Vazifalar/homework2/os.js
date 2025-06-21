const os = require('os');

console.log( os.type());

console.log(os.userInfo());

const ramHajmi = (os.totalmem() / (1024 * 1024))
console.log(ramHajmi);

console.log(os.uptime());
