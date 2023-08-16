import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { api } from "../config/apiConfig.js";
import PhraseAuthPage from "../components/phraseAuthPage.js";
import { AuthContext } from "../context/AuthContext.js";


export default function SignInPage() {
    const { saveToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //Checar se os dados foram preenchidos corretamente
    function checkData(event) {
        event.preventDefault()
        const EmailValid = /\S+@\S+\.\S+/;

        const signIn = async () => {
            try {
                const promisse = await api.post('/signin', { email, password })
                saveToken(promisse.data)
                setIsLoading(false);
                navigate("/timeline")
            } catch (error) {
                setIsLoading(false)
                alert(error.response.data)
            }
        }

        if ((email.search(EmailValid) !== -1) && password.length >= 3) {
            setIsLoading(true);
            signIn()
        } else {
            alert("Preencha os dados corretamente")
        }
    }

    //Mudança de página para Cadastro
    function getSignUp(event) {
        event.preventDefault()
        navigate('/signup')
    }
    return (
        <SingInContainer>
            <PhraseAuthPage />
            <form>
                <input
                    placeholder="e-mail"
                    type="email"
                    required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="password"
                    type="password"
                    required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={checkData} type="submit" disabled={isLoading}>
                    Sign In
                </Button>
                <Message onClick={getSignUp}>First time? Create an account!</Message>
            </form>
        </SingInContainer>
    )
}

const SingInContainer = styled.section`
font-family: 'Passion One', cursive;
font-weight: 700;
height: 100vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;`

const Message = styled.div`
font-family: 'Lato', sans-serif;
color: #FFFFFF;
font-size: 17px;
line-height: 20px;
text-decoration: underline;
}`

const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
height: 40px;
width: 450px;
border: none;
border-radius: 5px;
font-size: 18px;
font-weight: 700;
color: #FFFFFF;
text-align: center;
margin-bottom: 25px;
background-color: #1877F2;
outline: none;
cursor: pointer;
:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
`;