// const Fn = num1 => {
//   // 下面这个引用父级参数，num1会被保存下来
//   return num2 => {
//     num1 += num2;
//     console.log(num1);
//   }
// }
// const sum1 = Fn(1)
// sum1(2)
// sum1(3)

// // ---------------------------
// const add = n1 =>{
//   return n2 =>{
//     return (n1 += n2);
//   }
// }
// // const add2 = n1=> n2=> (n1+=n2);
// const addUp = add(1)
// // addUp(2)
// // addUp(3)
// const result = addUp(4)
// console.log(result);