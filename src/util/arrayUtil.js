import { shuffleVocab } from "../modules/vocab";

export function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function cloneObject(object) {
  if (object === null || typeof object !== 'object') {
    return object;
  }

  let temp;
  if (Array.isArray(object)) {
    temp = [];
  } else {
    temp = {};
  }

  for (let key of Object.keys(object)) {
    temp[key] = cloneObject(object[key]);
  }

  return temp;
}

// export function getRandom(arr, n, includeIndex) {
//   if (includeIndex != null) {
//     arr.splice(includeIndex, 1);
//   }
//   var result = new Array(n),
//     len = arr.length,
//     taken = new Array(len);
//   if (n > len)
//     throw new RangeError('getRandom: more elements taken than available');
//   while (n--) {
//     var x = Math.floor(Math.random() * len);
//     result[n] = arr[x in taken ? taken[x] : x];
//     taken[x] = --len in taken ? taken[len] : len;
//   }
//   return result;
// }
export function getRandom(arr, n, includeIndex) {
  
  const answerVocab = arr.splice(includeIndex, 1);
  var result = [];
  result.push(answerVocab[0]);

  arr = shuffle(arr);
  for(let i=0; i<n-1; i++){
    const tmpVocab = arr.pop();
    result.push(tmpVocab);
  }
  
  if(result.length === n){
    return result;
  }else{
    console.log('getRandom() error');
  }
  
  return result;
}