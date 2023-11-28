// import moment from "moment";
// const moment = require("moment");

export function getTheme(theme: string) {
  const THEME_BG = CALENDAR_EVENT_STYLE;
  switch (theme) {
    case "BLUE":
      return THEME_BG.BLUE;
    case "GREEN":
      return THEME_BG.GREEN;
    case "PURPLE":
      return THEME_BG.PURPLE;
    case "ORANGE":
      return THEME_BG.ORANGE;
    case "PINK":
      return THEME_BG.PINK;
    case "MORE":
      return THEME_BG.MORE;
  }
}

export const CALENDAR_EVENT_STYLE = Object.freeze({
  BLUE: "bg-blue-200 dark:bg-blue-600 dark:text-blue-100",
  GREEN: "bg-green-200 dark:bg-green-600 dark:text-green-100",
  PURPLE: "bg-purple-200 dark:bg-purple-600 dark:text-purple-100",
  ORANGE: "bg-orange-200 dark:bg-orange-600 dark:text-orange-100",
  PINK: "bg-pink-200 dark:bg-pink-600 dark:text-pink-100",
  MORE: "hover:underline cursor-pointer font-medium ",
});
