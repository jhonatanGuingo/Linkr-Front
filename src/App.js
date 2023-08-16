import { BrowserRouter, Routes , Route} from "react-router-dom";
import SingUpPage from "./pages/signUpPage.js";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SingUpPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;