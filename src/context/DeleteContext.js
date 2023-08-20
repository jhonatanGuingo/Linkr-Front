import { createContext, useState } from "react";

export const DeleteContext = createContext()

export default function DeleteProvider({children}){
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
    const [postToDelete, setPostToDelete] = useState('')
    const [deleted, setDeleted] = useState(false)
    return(
        <DeleteContext.Provider value={{deleteButtonClicked, setDeleteButtonClicked, postToDelete, setPostToDelete, deleted, setDeleted}}>
            {children}
        </DeleteContext.Provider>
    )
}