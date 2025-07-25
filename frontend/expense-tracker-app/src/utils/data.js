import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuBanknote,
  LuInfo,
} from "react-icons/lu";



export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "04",
    label: "Money Tips",
    icon: LuBanknote ,
    path: "/moneytips",
  },
  {
    id: "04",
    label: "About",
    icon: LuInfo ,
    path: "/about",
  },
];
