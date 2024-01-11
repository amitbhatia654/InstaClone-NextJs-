"use client"
import { createContext, useState } from "react"

export const ApplicationContext = createContext()


export const ApplicationProvider = (props) => {
    const [name, setName] = useState({})
    return <ApplicationContext.Provider value={{ name, setName }}>
        {props.children}
    </ApplicationContext.Provider>
}