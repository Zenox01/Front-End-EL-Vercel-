export const mainMenu = {
  cases: {
    id: "cases",
    text: "Cases",
    path: "/cases",
    icon: "Dashboard",
    subMenu: null,
  },

  judges: {
    id: "judges",
    text: "Judges",
    path: "/judge/panel",
    icon: "Dashboard",
    subMenu: null,
  },
  statutes: {
    id: "statutes",
    text: "Statutes",
    path: "/statutes",
    icon: "Dashboard",
    subMenu: {
      primary: {
        id: "primary",
        text: "Primary",
        path: "/statutes/prisec/primary",
        icon: "Dashboard",
      },
      secondary: {
        id: "secondary",
        text: "Secondary",
        path: "/statutes/prisec/secondary",
        icon: "Dashboard",
      },
      amendments: {
        id: "amendments",
        text: "Amendments",
        path: "/statutes/prisec/amendment",
        icon: "Dashboard",
      },
      bills: {
        id: "bills",
        text: "Bills",
        path: "/statutes/prisec/bills",
        icon: "Dashboard",
      },
    },
  },
  legislation: {
    id: "legislation",
    text: "Legislation",
    path: "/statutes",
    icon: "Dashboard",
    subMenu: {
      provincial: {
        id: "provincial",
        text: "Provincial",
        path: "/statutes/Provincial",
        icon: "Dashboard",
        subMenu: {
          punjab: {
            id: "punjab",
            text: "Punjab",
            path: "/statutes/Provincial/Punjab",
            icon: "Dashboard",
          },
          sindh: {
            id: "sindh",
            text: "Sindh",
            path: "/statutes/Provincial/Sindh",
            icon: "Dashboard",
          },
          balochistan: {
            id: "balochistan",
            text: "Balochistan",
            path: "/statutes/Provincial/Balochistan",
            icon: "Dashboard",
          },
          kpk: {
            id: "kpk",
            text: "Khyber Pakhtunkhwa",
            path: "/statutes/Provincial/Khyber%20Pakhtunkhwa",
            icon: "Dashboard",
          },
          ajk: {
            id: "ajk",
            text: "Azad Jammu & Kashmir",
            path: "/statutes/Provincial/Azad%20Jammu%20&%20Kashmir",
            icon: "Dashboard",
          },
          gilgitBaltistan: {
            id: "gilgitBaltistan",
            text: "Gilgit Baltistan",
            path: "/statutes/Provincial/Gilgit%20Baltistan",
            icon: "Dashboard",
          },
        },
      },
      federal: {
        id: "federal",
        text: "Federal",
        path: "/statutes/Federal",
        icon: "Dashboard",
      },
      other: {
        id: "other",
        text: "Other",
        path: "/statutes/Other",
        icon: "Dashboard",
      },
    },
  },
  departments: {
    id: "departments",
    text: "Departments",
    path: "/departments",
    icon: "Dashboard",
    subMenu: null,
  },
};
export const statutes = {
  id: "statutes",
  text: "Statutes",
  path: "/statutes/:jurisdiction/:SubGroup",
  icon: "search",
  subMenu: null,
};
export const search = {
  searchResult: {
    id: "searchResult",
    text: "Results",
    path: "/search-result",
    icon: "search",
    subMenu: null,
  },
};
export const page404 = {
  id: "Page404",
  text: "404 Page",
  path: "404",
  icon: "ReportGmailerrorred",
};
export const judgement= {
  id: "judgement",
  text: "Judgement",
  path: "/judgement",
  icon: "Dashboard",
  subMenu: null,
};