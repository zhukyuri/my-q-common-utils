clear
npm run build

node -e "
  const { MyQFormatDate } = require('./index.js');
  const formatter = new MyQFormatDate();
  console.log(formatter.allMonthOfYear(new Date()));
  "