import { createContext, useState } from "react";


export const EditContext = createContext()

export default function EditProvider({children}){
    const [edited, setEdited] = useState(false)
    const [newPost, setNewPost] = useState({});
    return(
        <EditContext.Provider value={{edited, setEdited, newPost, setNewPost}}>
            {children}
        </EditContext.Provider>
    )
}