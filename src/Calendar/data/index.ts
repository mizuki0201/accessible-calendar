import dayjs from "dayjs";

/** 動的なデータを用意できないため、当日を2023/04/10という前提でアプリを作成 */
export const today = dayjs("2023-04-10");

/** 2023/04のデータ */
export const dataOfApril = [...Array(42)].map((_, index) => {
  const date = dayjs("2023-03-26").add(index, "day");
  return {
    year: date.year().toString(),
    month: (date.month() + 1).toString(),
    day: date.date().toString(),
  };
});
