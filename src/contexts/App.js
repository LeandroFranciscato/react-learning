import { createContext } from "react"

export const appContextValues = {
    alert: {
        shown: false,
        severity: "success",
        title: "",
        message: "",
    },
    loading: {
        status: false
    },
    setApp: (app) => { }
}
export const AppContext = createContext(appContextValues)