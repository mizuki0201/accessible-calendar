import { FC } from "react";
import { dataOfApril } from "./data";
import { chakra } from "@chakra-ui/react";
import { MonthSwitch } from "./MonthSwitch/MonthSwitch";
import { CalendarCells } from "./CalendarCells/CalendarCells";

export const Calendar: FC = () => (
  <chakra.div maxW="700px" p="16px">
    <chakra.button mb="16px">
      [フォーカス遷移テストのために配置]カレンダーの前にあるフォーカス可能な要素
    </chakra.button>

    <MonthSwitch />
    <CalendarCells calendarData={dataOfApril} />

    <chakra.button mt="16px">
      [フォーカス遷移テストのために配置]カレンダーの後にあるフォーカス可能な要素
    </chakra.button>
  </chakra.div>
);
