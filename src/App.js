import { BrowserRouter, Routes , Route} from "react-router-dom";
import SingUpPage from "./pages/signUpPage.js";
import SignInPage from "./pages/signInPage.js";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SingUpPage />} />
                    <Route path="/" element={<SignInPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;