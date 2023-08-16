import { styled } from "styled-components"


export default function PhraseAuthPage() {
    return (
        <>
            <Title>
                <h1>linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </Title>
        </>)
}

const Title = styled.div`
width:70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 100%;
    color: #FFFFFF;
    background-color: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 15px;
    padding: 20px;
    h1{
        font-size: 106px;
        margin-left: 10%;
        line-height: 84px;
        letter-spacing: 0.05em;
        }
    }
    h2{
        width: 450px;
        font-size: 43px;
        line-height: 64px;
        text-align: start;
        margin-top: 10px;
        margin-left: 10%;
    }`