import { styled } from "styled-components";
import { Tagify } from 'react-tagify';
import { useNavigate } from "react-router-dom";
export default function Trending(props){
    const {nameHashtag} = props;
    const comHash = '#'+nameHashtag;
    const navigate = useNavigate();
    function handleHashtagPage(text){
        console.log(text);
        navigate(`/hashtag/${text}`);
    }
    return (
        
           
        <ContainerTrend>
       
       <Tagify tagStyle={{fontWeight: 'bold'}} onClick={(text) => handleHashtagPage(text)}>
                {comHash}
            </Tagify>
            
        </ContainerTrend>
       
    )
}

const ContainerTrend = styled.a`
        
        color: #FFF;
        font-family: Lato;
        font-size: 19px;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.95px;
        margin-left: 16px;
        margin-top: 5px;
       
        
    
`
