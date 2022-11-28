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
    const endDate: Date = this.subtractDate(this.begginingMonth(baseDate));
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
  x: string;
  y: number;
}

export interface TChartLineFormat_Line {
  id: string;
  color: string;
  data: TChartLineFormat_Point[];
}

export type TChartLineFormat = TChartLineFormat_Line[]

// export const createLineDate = (toDate: Date, data: TChartLineFormat_Point, pointsY: PointsY, colors: ColorArr) => {
//   const C = new MyQFormatDate(toDate);
//   const pointsX = C.datesMonthFromPrevToCurrent();
// };
