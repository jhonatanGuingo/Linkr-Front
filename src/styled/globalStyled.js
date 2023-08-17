import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
    }

    body{
        background-color: #333333;
    }

    input {
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
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 800px;
        border-radius: 5px;
    }
`

export default GlobalStyle