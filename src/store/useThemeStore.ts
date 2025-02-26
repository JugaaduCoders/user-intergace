import { getItem } from "@/utils/storage/localStorage";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: getItem("theme") === "light" ? false : true,
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
  },
});
