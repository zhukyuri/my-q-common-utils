"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQFormatDate = void 0;
const moment_1 = __importDefault(require("moment"));
class MyQFormatDate {
    baseDay;
    dateArray = [];
    constructor(baseDate = new Date()) {
        this.baseDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    }
    begginingDay = (date = this.baseDay) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    begginingMonth = (date = this.baseDay) => {
        return new Date(date.getFullYear(), date.getMonth());
    };
    subtractDate = (date, subtract = 'month', amount = 1) => {
        return (0, moment_1.default)(this.begginingDay(date)).subtract(amount, subtract).toDate();
    };
    dateListDayOfMoth = (baseDate = this.baseDay) => {
        const endDate = this.subtractDate(this.begginingMonth(baseDate));
        let dateMath = (0, moment_1.default)(this.subtractDate(endDate, 'month', 1));
        this.dateArray = [];
        while (dateMath.toDate() <= endDate) {
            this.dateArray.push(dateMath.toDate());
            dateMath = (0, moment_1.default)(dateMath).add(1, 'day');
        }
        return this.dateArray;
    };
    dateListMonthOfYear = (baseDate = this.baseDay) => {
        const endDate = this.subtractDate(this.begginingMonth(baseDate));
        let dateMath = (0, moment_1.default)(this.subtractDate(endDate, 'year', 1));
        this.dateArray = [];
        while (dateMath.toDate() <= endDate) {
            this.dateArray.push(dateMath.toDate());
            dateMath = (0, moment_1.default)(dateMath).add(1, 'month');
        }
        return this.dateArray;
    };
    daysOfMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    endDayOdMonth(date) {
        return (new Date(date.getFullYear(), date.getMonth(), 0)).getDate();
    }
    makeSequentialArray = function (count) {
        return Array.from({ length: count }, (_, index) => index + 1);
    };
    allDaysOfMonth = (date) => {
        const dayFirst = 1;
        const dayEnd = this.endDayOdMonth(date);
        return {
            daysArray: this.makeSequentialArray(dayEnd), dayFirst, dayEnd, month: date.getMonth(),
        };
    };
}
exports.MyQFormatDate = MyQFormatDate;
// export const createLineDate = (toDate: Date, data: TChartLineFormat_Point, pointsY: PointsY, colors: ColorArr) => {
//   const C = new MyQFormatDate(toDate);
//   const pointsX = C.datesMonthFromPrevToCurrent();
// };
