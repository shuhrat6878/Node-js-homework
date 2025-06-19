export function sleep(sek){
    return new Promise(resolve=> setTimeout(resolve,sek));
}
