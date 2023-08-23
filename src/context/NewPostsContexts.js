import { createContext } from "react";


export const NewPostsContext = createContext();

export default function NewPostsProvider({children}){
    const [newPosts, setNewPosts] = useState(0)
    
    return(
        <NewPostsContext.Provider>
            {children}
        </NewPostsContext.Provider>
    )
}