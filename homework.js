console.log('Hi');
arr1= [];
let r=0;
while(arr1.length<100)
{
    r=r+1;
    arr1.push(r)
}
arr1.forEach(element => {
    r=Math.random() * (99 - 0) + 0;
    r=r-r%1;
    let tmp=arr1[r];
    arr1[r]=element;
    arr1[arr1.indexOf(element)]=tmp;
});
console.log(arr1);
let arr2 = [];
arr1.forEach(element => {
arr2.unshift(element);
});
console.log(arr2);
let arr3=arr2.map(function(n){
    return arr1[arr2.indexOf(n)]-n;
});
console.log(arr3);
let sum = 0;
//ОНА ВСЕГДА 0 ТК элементы arr3 симетрично противоположны элемент arr3[n]=-arr3[100-n],
//тк arr3[n]=arr1[n]-arr2[n]=arr1[n]-arr1[100-n]; arr3[100-n]=arr1[100-n]-arr2[100-n]=arr1[100-n]-arr1[n]
//arr1[n]-arr1[100-n]+arr1[100-n]-arr1[n]=0!!!
console.log(0);