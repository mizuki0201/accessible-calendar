import { FC, useRef, useState } from "react";
import { chakra } from "@chakra-ui/react";
import dayjs from "dayjs";
import { today } from "../data";
import { useClickAway } from "react-use";

const weekDays = [
  { keyText: "sunday", weekDay: "日" },
  { keyText: "monday", weekDay: "月" },
  { keyText: "tuesday", weekDay: "火" },
  { keyText: "wednesday", weekDay: "水" },
  { keyText: "thursday", weekDay: "木" },
  { keyText: "friday", weekDay: "金" },
  { keyText: "saturday", weekDay: "土" },
];

type Date = {
  year: string;
  month: string;
  day: string;
};

export const CalendarCells: FC<{
  calendarData: Array<Date>;
}> = ({ calendarData }) => {
  const containerRef = useRef<HTMLTableElement>(null);
  const [isFocusInCalendar, setIsFocusInCalendar] = useState(false);

  useClickAway(containerRef, () => setIsFocusInCalendar(false));

  // 1週間ごとの2次元配列に変換する
  const calendars = calendarData.reduce(
    (prev, current) => {
      if (prev[prev.length - 1].length < 7) {
        prev[prev.length - 1].push(current);
      } else {
        prev.push([current]);
      }
      return prev;
    },
    [[]] as Array<Array<Date>>
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab") {
      // フォーカス移動の前にstate更新を待つ
      setTimeout(() => setIsFocusInCalendar(false), 10);
      return;
    }

    e.preventDefault();
    if (
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "Enter"
    ) {
      return;
    }

    const focusedDate = dayjs((e.target as HTMLElement).dataset.date as string);

    // セル内のフォーカス移動
    const onChangeFocus = (diffDay: number) => {
      const movedDate = focusedDate.add(diffDay, "day");
      const movedElement =
        containerRef.current?.querySelector<HTMLButtonElement>(
          `[data-date="${movedDate.format("YYYY-M-D")}"]`
        );
      movedElement?.focus();
    };

    // キー操作
    switch (e.key) {
      case "ArrowLeft": {
        onChangeFocus(-1); // 1日前
        break;
      }
      case "ArrowRight": {
        onChangeFocus(1); // 1日後
        break;
      }
      case "ArrowUp": {
        onChangeFocus(-7); // 7日前
        break;
      }
      case "ArrowDown": {
        onChangeFocus(7); // 7日後
        break;
      }
      case "Enter": {
        alert(`${focusedDate.format("YYYY年M月D日")}をクリックしました`);
        break;
      }
    }
  };

  return (
    <chakra.table
      width="100%"
      role="grid"
      ref={containerRef}
      onFocus={() => setIsFocusInCalendar(true)}
    >
      <chakra.thead>
        {/* 曜日のCell */}
        <chakra.tr
          role="row"
          display="grid"
          gridTemplateColumns="repeat(7, 1fr)"
        >
          {weekDays.map(({ keyText, weekDay }) => (
            <WeekDayCell key={keyText}>{weekDay}</WeekDayCell>
          ))}
        </chakra.tr>
      </chakra.thead>

      {/* 日付のCell */}
      <chakra.tbody minH="275px">
        {calendars.map((week, index) => (
          <chakra.tr key={`${index + 1}週目`} display="flex">
            {week.map(({ year, month, day }) => {
              const date = dayjs(`${year}-${month}-${day}`);
              const isToday = date.isSame(today, "day");

              return (
                <DateCell key={`${year}年${month}月${day}日`}>
                  <chakra.button
                    tabIndex={isFocusInCalendar ? -1 : 0}
                    aria-label={`${year}年${month}月${day}日`}
                    {...(isToday && {
                      "aria-current": "date",
                      fontWeight: "bold",
                    })}
                    data-date={`${year}-${month}-${day}`}
                    onClick={() =>
                      alert(`${year}年${month}月${day}日をクリックしました`)
                    }
                    onKeyDown={onKeyDown}
                  >
                    {day}
                  </chakra.button>
                </DateCell>
              );
            })}
          </chakra.tr>
        ))}
      </chakra.tbody>
    </chakra.table>
  );
};

// 曜日のセルのstyle
const WeekDayCell = chakra("th", {
  baseStyle: {
    fontSize: "14px",
    fontWeight: "bold",
    height: "38px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    _first: { color: "red" },
    _last: { color: "blue" },
  },
});

// 日付のセルのstyle
const DateCell = chakra("td", {
  baseStyle: {
    height: "56px",
    width: "100%",
    margin: "0 -1px -1px 0",
    fontSize: "14px",
    border: "1px solid #EAEAEA",
    _first: { color: "red" },
    _last: { color: "blue" },
    "& > button": {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      pt: "10px",
    },
  },
});
