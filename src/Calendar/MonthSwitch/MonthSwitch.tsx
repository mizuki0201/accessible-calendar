import { FC } from "react";
import { chakra } from "@chakra-ui/react";

export const MonthSwitch: FC = () => (
  <chakra.div
    py="12px"
    px="16px"
    display="flex"
    justifyContent="space-between"
    borderTop="1px solid #D1D1D1"
    borderBottom="1px solid #D1D1D1"
  >
    <chakra.button
      onClick={() => alert("前の月を表示します")}
      aria-label="前の月"
    >
      ＜
    </chakra.button>
    <chakra.p fontSize="14">2023年4月</chakra.p>
    <chakra.button
      onClick={() => alert("次の月を表示します")}
      aria-label="次の月"
    >
      ＞
    </chakra.button>
  </chakra.div>
);
