clear
npm run build

node -e "
  const { MyQFormatDate } = require('./index.js');
  const formatter = new MyQFormatDate();
  
  let res = formatter.allDaysOfMonth(new Date());
  res = res.map((i)=> ({
        date: i.date,
        year: i.year,
        month: i.month,
        day: i.day
  }))
  console.log(res);

  console.log('===========================')
  
  let res2 = formatter.allMonthOfYear(new Date());
  res2 = res2.map((i)=> ({
        date: i.date,
        year: i.year,
        month: i.month,
        day: i.day
  }))
  console.log(res2);
  
  
  "