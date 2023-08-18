import { BrowserRouter, Routes , Route} from "react-router-dom";
import SingUpPage from "./pages/signUpPage.js";
import SignInPage from "./pages/signInPage.js";
import TestPage from "./pages/TestPage.js";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SingUpPage />} />
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/timeline" element={<TestPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;