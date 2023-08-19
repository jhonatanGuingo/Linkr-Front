import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingUpPage from "./pages/signUpPage.js";
import SignInPage from "./pages/signInPage.js";
import TimelinePage from "./pages/TimelinePage.js";
import UserPage from "./pages/userPage.js";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/user/:id" element={<UserPage />} />
                    <Route path="/signup" element={<SingUpPage />} />
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/timeline" element={<TimelinePage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;