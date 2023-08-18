import {styled} from "styled-components"
import Header from "./Header"
import { Tagify } from 'react-tagify';

export default function SideBarHashtags(){

    return(
        <>
        <Header/>
        <ContainerSideBar>
            <div>
                <h1>trending</h1>
            </div>
            <Tagify onClick={(text, type) => console.log(text, type)} >
            <a>#react</a>
            </Tagify>
            <a>#react</a>
            <a>#react</a>
            <a>#react</a>
            <a>#react</a>
            <a>#react</a>
            <a>#react</a>
            <a>#react</a>
            <a>#react</a>
            <a>#react</a>
        </ContainerSideBar>
        
        </>
    )
}

const ContainerSideBar = styled.div`
    height: 406px;
    width: 301px;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    margin-top: 100px;
    background-color: #171717;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    a{
        color: #FFF;
        font-family: Lato;
        font-size: 19px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.95px;
        margin-left: 16px;
        margin-top: 5px;
        
    }
    div{
        margin-bottom: 22px;
        height: 60px;
        width: 100%;
        border-bottom: 1px solid #484848;
        display: flex;
        align-items: center;
        h1{
            margin-left: 16px;
            color: #FFF;
            font-family: Oswald;
            font-size: 27px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

        }
    }
`