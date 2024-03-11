const date = new Date();
const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
console.log(lastMonth);
const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
console.log(prevMonth);
