import { styled } from "styled-components"



export default function LinkContainer(props){
    const {urlInfo, setUrlInfo} = props

    return(
        <LinkContainerr onClick={() => window.open(urlInfo.url, '_blank')}>
            <LinkInfoContainer>
                <Title>{urlInfo.title}</Title>
                <Description>{urlInfo.description}</Description>
                <Url>{urlInfo.url}</Url>
            </LinkInfoContainer>
            <UrlImg src={urlInfo.images[0]}/>
        </LinkContainerr>
    )
}


const LinkContainerr = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 160px;
    width: 540px;
    //background-color: red;
    
    border-radius: 12px;
    border: 1px solid #495057;
    border-right: none;
`
const LinkInfoContainer = styled.div`
    box-sizing: border-box;
    padding: 15px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    width: 65%;
`
const UrlImg = styled.img`
    height: 101%;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    width: 35%;
`
const Title = styled.p`
    font-size: 22px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 600;
    color: #ced4da;
    line-height: 25px;
    margin: 0;
`

const Description = styled.p`
    font-size: 14px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 400;
    color: #6c757d;
    line-height: 18px;
    margin: 0;
`

const Url = styled.p`
    font-size: 12px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 400;
    color: #ced4da;
    margin: 0;
`