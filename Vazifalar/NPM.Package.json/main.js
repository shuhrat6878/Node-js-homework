import { sleep } from './sleep.js';
import { randomSon } from './random.js';
import { Person } from './person.js';

const delay = randomSon(); 

console.log(`Kutilyapti ${delay} miliysekund`);

await sleep(delay);

const user = new Person("Anorboyev", 2000);
console.log(user.getInfo());
