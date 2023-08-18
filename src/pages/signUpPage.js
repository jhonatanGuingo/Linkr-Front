import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { api } from "../config/apiConfig.js"
import { useState } from "react"
import PhraseAuthPage from "../components/phraseAuthPage.js"

export default function SingUpPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //Mudança de página para Login
    function getSignIn(event) {
        event.preventDefault()
        navigate('/')
    }

    //Checar se os dados foram preenchidos corretamente
    function checkData(event) {
        event.preventDefault()
        const EmailValid = /\S+@\S+\.\S+/;

        const signUp = async () => {
            try {
                const promisse = await api.post("/signup", { userName, email, password, image })
                setIsLoading(false);
                navigate('/')
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                alert(error.response.data)
            }
        }

        if (userName.length > 0 && (email.search(EmailValid) !== -1) && password.length >= 3) {
            setIsLoading(true);
            signUp()
        } else {
            alert("erro: preencha os dados corretamente")
        }
    }

    return (
        <>
            <SingUpContainer>
                <PhraseAuthPage/>
                <SignUpForm>
                    <SignUpInput
                        placeholder="email"
                        type="email"
                        required value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <SignUpInput
                        placeholder="password"
                        type="password"
                        required value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SignUpInput
                        placeholder="username"
                        type="name"
                        required value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                    <SignUpInput 
                        placeholder="picture url"
                        type="url"
                        required value={image}
                        onChange={(e) => setImage(e.target.value)} />
                    <Button onClick={checkData} data-test="sign-up-btn" type="submit" disabled={isLoading}>
                        Sign Up
                    </Button>
                    <Message onClick={getSignIn}>Switch back to log in</Message>
                </SignUpForm>
            </SingUpContainer>
        </>
    )
}

const SingUpContainer = styled.section`
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
`

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 800px;
    border-radius: 5px;
`

const SignUpInput = styled.input`
    font-size: 18px;
    height:20px;
    width: 429px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 1px;
    :focus {
        border: 2px solid #ffb6b6;
        margin: 0px;
    }
`

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