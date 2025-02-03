import r from "dayjs";
const I = "YYYY-MM-DD HH:mm", g = "YYYY-MM-DD", M = 12, C = () => r.months(), R = (t) => r.months()[t], T = () => r.weekdays(), k = () => r.weekdaysShort(), w = (t, n) => {
  r().locale(t);
  let e = r.weekdaysMin();
  return n > 0 && (e = [
    ...e.slice(n, e.length),
    ...e.slice(0, n)
  ]), e;
}, N = (t) => r(t).format(I), F = (t) => r(t).month(), H = (t) => r(t).year(), P = () => r().format(g);
function O(t, n) {
  if (!t || !n)
    return !1;
  const e = r(t).format(g), o = r(n).format(g);
  return e === o;
}
function j(t, {
  startDate: n,
  endDate: e
}) {
  return !n || !e ? !1 : r(t) <= e && r(t) >= n;
}
function S(t, {
  minDate: n,
  maxDate: e,
  disabledDates: o
}) {
  return n && t < d(n) || e && t > d(e) ? !0 : o ? Array.isArray(o) ? o.some(
    (a) => O(t, a)
  ) : o(t) : !1;
}
const v = (t, n) => r(t).format(n), d = (t) => r(t, g), U = (t) => {
  const n = M * Math.ceil(t / M);
  let e = n === t ? n : n - M;
  return e < 0 && (e = 0), Array.from({ length: M }, (o, a) => e + a);
};
function E(t, n, e) {
  const o = r(t).daysInMonth(), a = r(t).add(-1, "month").daysInMonth(), c = r(t).date(1 - e).day() % 7, m = n ? c : 0, h = c + o, u = n ? h > 35 ? 42 - h : 35 - h : 0, D = m + o + u;
  return {
    prevMonthDays: a,
    prevMonthOffset: c,
    daysInCurrentMonth: o,
    daysInNextMonth: u,
    fullDaysInMonth: D
  };
}
function B(t, n) {
  return d(t).date(1 - n).day();
}
function G(t) {
  return r(t).startOf("day");
}
function L(t) {
  return r(t).endOf("day");
}
function W(t) {
  return r(t).unix();
}
const Z = (t) => ({
  year: r(t).year(),
  month: r(t).month(),
  hour: r(t).hour(),
  minute: r(t).minute()
}), q = (t = r(), n, e, o, a, y) => {
  const c = d(t), {
    prevMonthDays: m,
    prevMonthOffset: h,
    daysInCurrentMonth: u,
    daysInNextMonth: D
  } = E(t, n, a), Y = n ? Array.from({ length: h }, (l, f) => {
    const s = f + (m - h + 1), i = c.add(-1, "month").date(s);
    return A(
      s,
      i,
      e,
      o,
      y,
      !1,
      f + 1
    );
  }) : Array(h).fill(null), _ = Array.from({ length: u }, (l, f) => {
    const s = f + 1, i = c.date(s);
    return A(
      s,
      i,
      e,
      o,
      y,
      !0,
      h + s
    );
  }), p = Array.from({ length: D }, (l, f) => {
    const s = f + 1, i = c.add(1, "month").date(s);
    return A(
      s,
      i,
      e,
      o,
      y,
      !1,
      u + h + s
    );
  });
  return [...Y, ..._, ...p];
}, A = (t, n, e, o, a, y, c) => ({
  text: t.toString(),
  day: t,
  date: v(n, g),
  disabled: S(n, { minDate: e, maxDate: o, disabledDates: a }),
  isCurrentMonth: y,
  dayOfMonth: c
});
function z(t, n) {
  t || (t = "#000000"), t.length > 7 && (t = t.substring(0, t.length - 2));
  let o = Math.round(Math.min(Math.max(n, 0), 1) * 255).toString(16).toUpperCase();
  return o.length === 1 && (o = "0" + o), t + o;
}
export {
  I as CALENDAR_FORMAT,
  g as DATE_FORMAT,
  M as YEAR_PAGE_SIZE,
  z as addColorAlpha,
  O as areDatesOnSameDay,
  W as dateToUnix,
  d as getDate,
  F as getDateMonth,
  H as getDateYear,
  E as getDaysInMonth,
  L as getEndOfDay,
  B as getFirstDayOfMonth,
  N as getFormated,
  v as getFormatedDate,
  q as getMonthDays,
  R as getMonthName,
  C as getMonths,
  Z as getParsedDate,
  G as getStartOfDay,
  P as getToday,
  T as getWeekdays,
  w as getWeekdaysMin,
  k as getWeekdaysShort,
  U as getYearRange,
  j as isDateBetween,
  S as isDateDisabled
};
//# sourceMappingURL=utils.js.map
