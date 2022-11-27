"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQFormatDate = void 0;
const moment_1 = __importDefault(require("moment"));
class MyQFormatDate {
    baseDay;
    subtract;
    dayArrLastMonth = [];
    constructor(baseDate = new Date(), subtract) {
        this.baseDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
        this.subtract = subtract;
    }
    begginingDay = (date = this.baseDay) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    datesMonthFromPrevToCurrent = (toDate = this.baseDay) => {
        const dateTo_ = this.begginingDay(toDate);
        let dateTemp;
        if (typeof this.subtract === 'number' && this.subtract > 0) {
            dateTemp = (0, moment_1.default)(this.begginingDay(dateTo_)).subtract(this.subtract, 'day');
        }
        else {
            dateTemp = (0, moment_1.default)(this.begginingDay(dateTo_)).subtract(1, 'month');
        }
        while (dateTemp.toDate() <= this.baseDay) {
            this.dayArrLastMonth.push(dateTemp.toDate());
            dateTemp = (0, moment_1.default)(this.begginingDay(toDate)).add(1, 'day');
        }
        return this.dayArrLastMonth;
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
