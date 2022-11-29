"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLineDateFromAggregation_Month = exports.MyQFormatDate = void 0;
const moment_1 = __importDefault(require("moment"));
class MyQFormatDate {
    baseDate;
    dateArray = [];
    constructor() {
        this.baseDate = new Date();
    }
    setBaseDate = ({ year, monthIndex, day }) => {
        this.baseDate = new Date(year, monthIndex, day);
    };
    getNewDate = ({ year, monthIndex, day }) => {
        return new Date(year, monthIndex, day).toDateString();
    };
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
        const endDate = this.subtractDate(this.begginingDay(baseDate));
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
const createLineDateFromAggregation_Month = (endDate, data, colors = []) => {
    const C = new MyQFormatDate();
    C.setBaseDate(endDate);
    const allDatesArray = C.dateListDayOfMoth(C.baseDate);
    // Colors
    let cLength = colors.length;
    const colors_ = cLength !== 0 ? colors : ['#FF0000', '#00FF00', '#0000FF'];
    cLength = colors_.length;
    const formatDate = (date) => (0, moment_1.default)(date).format('DD.MM').toString();
    const points = (data) => {
        const pointsObj = {};
        data.forEach(function (i) {
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
exports.createLineDateFromAggregation_Month = createLineDateFromAggregation_Month;
