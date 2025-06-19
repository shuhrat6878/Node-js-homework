export function randomSon(min =100,max = 999){
    return Math.floor(Math.random()*(max-min+1))+min;
}