"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQFormatDate = void 0;
const moment_1 = __importDefault(require("moment"));
class MyQFormatDate {
    baseDate;
    dateArray = [];
    constructor(baseDate) {
        this.baseDate = !baseDate ? new Date() : baseDate;
    }
    setBaseDate = (newBaseDate) => {
        if (newBaseDate)
            this.baseDate = new Date(newBaseDate.year, newBaseDate.monthIndex, newBaseDate.day);
        else
            this.baseDate = new Date();
    };
    getNewDate = ({ year, monthIndex, day }) => {
        return new Date(year, monthIndex, day).toDateString();
    };
    formatDate = (date, format = 'DD.MM') => (0, moment_1.default)(date).format(format).toString();
    begginingDay = (date = this.baseDate) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    begginingMonth = (date = this.baseDate) => {
        return new Date(date.getFullYear(), date.getMonth());
    };
    subtractDate = (date, subtract = 'month', amount = 1, addDays = 0) => {
        let res = (0, moment_1.default)(this.begginingDay(date)).subtract(amount, subtract);
        if (addDays)
            res = res.add(addDays, 'day');
        return res.toDate();
    };
    dateListDayOfMoth = (baseDate = this.baseDate) => {
        const endDate = this.begginingDay(baseDate);
        let dateMath = (0, moment_1.default)(this.subtractDate(endDate, 'month', 1, 1));
        this.dateArray = [];
        while (dateMath.toDate() <= endDate) {
            this.dateArray.push(dateMath.toDate());
            dateMath = (0, moment_1.default)(dateMath).add(1, 'day');
        }
        return this.dateArray;
    };
    dateListMonthOfYear = (baseDate = this.baseDate) => {
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
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    }
    makeSequentialArray = function (count) {
        return Array.from({ length: count }, (_, index) => index + 1);
    };
    allDaysOfMonth = (date) => {
        const daysArray = [];
        const dateM = (0, moment_1.default)(date);
        const endDate = dateM.add(1, 'day');
        const startDate = endDate.clone().subtract(1, 'month');
        const daysDiff = (0, moment_1.default)(endDate).diff(startDate, 'days');
        for (let i = 0; i < daysDiff; i++) {
            const dayDate = (0, moment_1.default)(startDate).add(i, 'days').toDate();
            daysArray.push({
                date: dayDate,
                year: dayDate.getFullYear(),
                month: dayDate.getMonth() + 1,
                day: dayDate.getDate(),
                key: (0, moment_1.default)(dayDate).format('YY-MM-DD'),
            });
        }
        return daysArray;
    };
    allMonthOfYear = (date) => {
        const monthArray = [];
        const currentMonth = new Date(date.getFullYear(), date.getMonth() + 2, 1);
        for (let i = 11; i >= 0; i--) {
            const monthDate = new Date(currentMonth.getFullYear(), date.getMonth() - i, 1);
            monthArray.push({
                date: monthDate,
                year: monthDate.getFullYear(),
                month: monthDate.getMonth() + 1,
                day: monthDate.getDate(),
                key: (0, moment_1.default)(monthDate).format('YY-MM-DD'),
            });
        }
        return monthArray;
    };
}
exports.MyQFormatDate = MyQFormatDate;
