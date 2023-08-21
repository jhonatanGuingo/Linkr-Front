import { createContext, useState } from "react";


export const EditContext = createContext()

export default function EditProvider({children}){
    const [edited, setEdited] = useState(false)
    return(
        <EditContext.Provider value={{edited, setEdited}}>
            {children}
        </EditContext.Provider>
    )
}