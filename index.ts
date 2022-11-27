import moment, { Moment } from 'moment';

export class MyQFormatDate {
  public baseDay;
  public subtract?: number;
  public dayArrLastMonth: Date[] = [];

  constructor(baseDate: Date = new Date(), subtract?: number) {
    this.baseDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    this.subtract = subtract;
  }

  public begginingDay = (date: Date = this.baseDay) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  public datesMonthFromPrevToCurrent = (toDate: Date = this.baseDay) => {
    const dateTo_ = this.begginingDay(toDate);
    let dateTemp: Moment;
    if (typeof this.subtract === 'number' && this.subtract > 0) {
      dateTemp = moment(this.begginingDay(dateTo_)).subtract(this.subtract, 'day');
    } else {
      dateTemp = moment(this.begginingDay(dateTo_)).subtract(1, 'month');
    }

    while (dateTemp.toDate() <= this.baseDay) {
      this.dayArrLastMonth.push(dateTemp.toDate());
      dateTemp = moment(this.begginingDay(toDate)).add(1, 'day');
    }
    return this.dayArrLastMonth;
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
