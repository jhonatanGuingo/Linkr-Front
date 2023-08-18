import { styled } from "styled-components"



export default function LinkContainer(props){
    const {urlInfo, setUrlInfo} = props
    return(
        <LinkContainerr>

        </LinkContainerr>
    )
}


const LinkContainerr = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 150px;
    width: 540px;
    //background-color: red;
    border-radius: 12px;
    border: 1px solid #495057;
    position: relative;
    img{
        height: 100%;
        border-radius: 12px;
    }
`
const LinkInfoContainer = styled.div`
    background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 65%;
`
const UrlImg = styled.img`
    height: 100%;
    border-radius: 12px;
    position: absolute;
    top: 0px;
    right: 0px;
`