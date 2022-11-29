import moment, { Moment } from 'moment';

export type TSubtract = 'month' | 'day' | 'year';
export type TAmount = number;

export interface TDateInitFormat {
  year: number,
  monthIndex: number,
  day: number;
}

export class MyQFormatDate {
  public baseDate: Date;
  public dateArray: Date[] = [];

  constructor() {
    this.baseDate = new Date();
  }

  public setBaseDate = ({ year, monthIndex, day }: TDateInitFormat): void => {
    this.baseDate = new Date(year, monthIndex, day);
  };

  public getNewDate = ({ year, monthIndex, day }: TDateInitFormat): string => {
    return new Date(year, monthIndex, day).toDateString();
  };

  public begginingDay = (date: Date = this.baseDate): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  public begginingMonth = (date: Date = this.baseDate): Date => {
    return new Date(date.getFullYear(), date.getMonth());
  };

  public subtractDate = (
    date: Date,
    subtract: TSubtract = 'month',
    amount: TAmount = 1,
    addDays: number = 0,
  ): Date => {
    let res = moment(this.begginingDay(date)).subtract(amount, subtract);
    if (addDays) res = res.add(addDays, 'day');
    return res.toDate();
  };

  public dateListDayOfMoth = (baseDate: Date = this.baseDate): Date[] => {
    const endDate: Date = this.subtractDate(this.begginingDay(baseDate));
    let dateMath: Moment = moment(this.subtractDate(endDate, 'month', 1, 1));
    this.dateArray = [];

    while (dateMath.toDate() <= endDate) {
      this.dateArray.push(dateMath.toDate());
      dateMath = moment(dateMath).add(1, 'day');
    }
    return this.dateArray;
  };

  public dateListMonthOfYear = (baseDate: Date = this.baseDate): Date[] => {
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

  public makeSequentialArray = function(count: number): number[] {
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

export const createLineDateFromAggregation_Month = (endDate: TDateInitFormat,
  data: TAggregateInvokeCounterMonth,
  colors: ColorArr = [],
): TChartLineFormat => {
  const C = new MyQFormatDate();
  C.setBaseDate(endDate);
  const allDatesArray: Date[] = C.dateListDayOfMoth(C.baseDate);
  // Colors
  let cLength = colors.length;
  const colors_ = cLength !== 0 ? colors : ['#FF0000', '#00FF00', '#0000FF'];
  cLength = colors_.length;

  const formatDate = (date: Date): string => moment(date).format('DD.MM').toString();

  const points = (data: TAggregateInvokeCounterMonth_Point[]): TChartLineFormat_Point[] => {
    const pointsObj: any = {};
    data.forEach(function(i) {
      pointsObj[formatDate(i.day)] = { ...i };
    });

    return allDatesArray.map((date) => {
      const fd = formatDate(date);

      return {
        x: fd.substring(0, 2), y: !pointsObj[fd] ? 0 : pointsObj[fd].count,
      };
    });
  };

  return data.map((line, index) => {
    const color = colors_[index % cLength];

    return {
      id: line.entity, color: color, data: points(line.data),
    };
  });
};
