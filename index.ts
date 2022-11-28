import moment, { Moment } from 'moment';

export type TSubtract = 'month' | 'day' | 'year';
export type TAmount = number;

export class MyQFormatDate {
  public baseDay: Date;
  public dateArray: Date[] = [];

  constructor(baseDate: Date = new Date()) {
    this.baseDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  }

  public begginingDay = (date: Date = this.baseDay): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  public begginingMonth = (date: Date = this.baseDay): Date => {
    return new Date(date.getFullYear(), date.getMonth());
  };

  public subtractDate = (date: Date, subtract: TSubtract = 'month', amount: TAmount = 1): Date => {
    return moment(this.begginingDay(date)).subtract(amount, subtract).toDate();
  };

  public dateListDayOfMoth = (baseDate: Date = this.baseDay): Date[] => {
    const endDate: Date = this.subtractDate(this.begginingDay(baseDate));
    let dateMath: Moment = moment(this.subtractDate(endDate, 'month', 1));
    this.dateArray = [];

    while (dateMath.toDate() <= endDate) {
      this.dateArray.push(dateMath.toDate());
      dateMath = moment(dateMath).add(1, 'day');
    }
    return this.dateArray;
  };

  public dateListMonthOfYear = (baseDate: Date = this.baseDay): Date[] => {
    const endDate: Date = this.subtractDate(this.begginingMonth(baseDate));
    let dateMath: Moment = moment(this.subtractDate(endDate, 'year', 1));
    this.dateArray = [];

    while (dateMath.toDate() <= endDate) {
      this.dateArray.push(dateMath.toDate());
      dateMath = moment(dateMath).add(1, 'month');
    }
    return this.dateArray;
  };

  public daysOfMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  public endDayOdMonth(date: Date): number {
    return (new Date(date.getFullYear(), date.getMonth(), 0)).getDate();
  }

  public makeSequentialArray = function (count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  };

  public allDaysOfMonth = (date: Date): {
    daysArray: number[], dayFirst: number, dayEnd: number, month: number,
  } => {
    const dayFirst = 1;
    const dayEnd: number = this.endDayOdMonth(date);

    return {
      daysArray: this.makeSequentialArray(dayEnd), dayFirst, dayEnd, month: date.getMonth(),
    };
  };
}

// MULTI LINE CHART

export type ColorArr = string[]
export type PointsY = string[]

export interface TChartLineFormat_Point {
  x: string;                        // Day
  y: number;                        // Count
}

export interface TChartLineFormat_Line {
  id: string;                         // Entity
  color: string;
  data: TChartLineFormat_Point[];
}

export type TChartLineFormat = TChartLineFormat_Line[]


export interface TAggregateInvokeCounterMonth_Point {
  day: Date;
  entity: string;
  count: number;
  dayNum: number;
  monthNum: number;
  yearNum: number;
}

export interface TAggregateInvokeCounterMonth_Line {
  data: TAggregateInvokeCounterMonth_Point[];
  entity: string;
}

export type TAggregateInvokeCounterMonth = TAggregateInvokeCounterMonth_Line[]

export const createLineDateFromAggregation_Month = (
  endDate: Date, data: TAggregateInvokeCounterMonth, colors: ColorArr = []): TChartLineFormat => {
  const C = new MyQFormatDate(endDate);
  const allDatesArray: Date[] = C.dateListDayOfMoth(endDate);
  // Colors
  const cLength = colors.length;
  const colors_ = cLength !== 0 ? colors : ['#FF0000', '#00FF00', '#0000FF'];
  let colorIndex = 0;

  const formatDate = (date: Date): string => moment(date).format('D.MM').toString();

  const points = (data: TAggregateInvokeCounterMonth_Point[]): TChartLineFormat_Point[] => {
    const pointsObj = {};
    data.forEach(function (i) {
      pointsObj[formatDate(i.day)] = { ...i };
    });

    return allDatesArray.map((date) => {
      const fd = formatDate(date);
      return {
        x: fd, y: !pointsObj[fd] ? 0 : pointsObj[fd].day,
      };
    });
  };

  return data.map(function (line) {
    const color = colors_[colorIndex];
    colorIndex++;
    if (colorIndex > (cLength - 1)) colorIndex = 0;

    return {
      id: line.entity, color: color, data: points(line.data),
    };
  });
};


// aggregateInvokeCounterMonth:

// {entity: 'COUNTER_DAY', data: Array(4)}

// {entity: 'ORGANIZATION', data: Array(9)}
