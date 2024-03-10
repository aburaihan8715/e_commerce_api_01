const date = new Date();
console.log('current date:', date);

const currentMonth = new Date(date.setMonth(date.getMonth()));
console.log('current month: ', currentMonth);

const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
console.log('last month: ', lastMonth);

const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
console.log('prev month: ', prevMonth);
