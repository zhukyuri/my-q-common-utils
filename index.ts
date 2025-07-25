import moment, { Moment } from 'moment'

export type TSubtract = 'month' | 'day' | 'year'
export type TAmount = number

export interface TDateInitFormat {
  year: number
  monthIndex: number
  day: number
}

export interface TFullDate {
  date: Date
  year: number
  month: number
  day: number
  key?: string
}

export class MyQFormatDate {
  public baseDate: Date
  public dateArray: Date[] = []

  constructor(baseDate?: Date) {
    this.baseDate = !baseDate ? new Date() : baseDate
  }

  public setBaseDate = (newBaseDate: TDateInitFormat | undefined): void => {
    if (newBaseDate) this.baseDate = new Date(newBaseDate.year, newBaseDate.monthIndex, newBaseDate.day)
    else this.baseDate = new Date()
  }

  public getNewDate = ({ year, monthIndex, day }: TDateInitFormat): string => {
    return new Date(year, monthIndex, day).toDateString()
  }

  public formatDate = (date: Date, format = 'DD.MM'): string => moment(date).format(format).toString()

  public begginingDay = (date: Date = this.baseDate): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  public begginingMonth = (date: Date = this.baseDate): Date => {
    return new Date(date.getFullYear(), date.getMonth())
  }

  public subtractDate = (date: Date, subtract: TSubtract = 'month', amount: TAmount = 1, addDays: number = 0): Date => {
    let res = moment(this.begginingDay(date)).subtract(amount, subtract)
    if (addDays) res = res.add(addDays, 'day')
    return res.toDate()
  }

  public dateListDayOfMoth = (baseDate: Date = this.baseDate): Date[] => {
    const endDate: Date = this.begginingDay(baseDate)
    let dateMath: Moment = moment(this.subtractDate(endDate, 'month', 1, 1))
    this.dateArray = []

    while (dateMath.toDate() <= endDate) {
      this.dateArray.push(dateMath.toDate())
      dateMath = moment(dateMath).add(1, 'day')
    }
    return this.dateArray
  }

  public dateListMonthOfYear = (baseDate: Date = this.baseDate): Date[] => {
    const endDate: Date = this.subtractDate(this.begginingMonth(baseDate))
    let dateMath: Moment = moment(this.subtractDate(endDate, 'year', 1))
    this.dateArray = []

    while (dateMath.toDate() <= endDate) {
      this.dateArray.push(dateMath.toDate())
      dateMath = moment(dateMath).add(1, 'month')
    }
    return this.dateArray
  }

  public daysOfMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate()
  }

  public endDayOdMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  }

  public makeSequentialArray = function (count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1)
  }

  public allDaysOfMonth = (date: Date): TFullDate[] => {
    const daysArray: TFullDate[] = []
    const dateM = moment(date)
    const endDate = dateM.add(1, 'day')
    const startDate = endDate.clone().subtract(1, 'month')
    const daysDiff = moment(endDate).diff(startDate, 'days')

    for (let i = 0; i < daysDiff; i++) {
      const dayDate = moment(startDate).add(i, 'days').toDate()
      daysArray.push({
        date: dayDate,
        year: dayDate.getFullYear(),
        month: dayDate.getMonth() + 1,
        day: dayDate.getDate(),
        key: moment(dayDate).format('YY-MM-DD'),
      })
    }

    return daysArray
  }

  public allMonthOfYear = (date: Date): TFullDate[] => {
    const monthArray: TFullDate[] = []
    const currentMonth = new Date(date.getFullYear(), date.getMonth() + 2, 1)

    for (let i = 11; i >= 0; i--) {
      const monthDate = new Date(currentMonth.getFullYear(), date.getMonth() - i, 1)
      monthArray.push({
        date: monthDate,
        year: monthDate.getFullYear(),
        month: monthDate.getMonth() + 1,
        day: monthDate.getDate(),
        key: moment(monthDate).format('YY-MM-DD'),
      })
    }

    return monthArray
  }
}
