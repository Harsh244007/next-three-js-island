// function printOdd(number = 5) {
//   let result = "1";
//   console.log(result);
//   for (let i = 1; i < number; i++) {
//     result = (i % 2 === 0 ? "1" : "0") + result;
//     // result = i % 2 === 0 ? "1" + result : "0" + result;
//     console.log(result);
//   }
// }
// printOdd();

// function printDay(str) {
//   const result = str.split(" ");
//   let final = [];
//   let i;
//   for (i = result.length-1; i >= 0; i--) {
//     // console.log("inside of it", final, result, result[i]);
//     final.push(result[i])  ;
//   }
//   console.log(final.join(' '));
// }
// printDay("Today is Tuesday");

Array.fill(5).forEach((element,index) => element.push(index%2==0?"0":"1")
)