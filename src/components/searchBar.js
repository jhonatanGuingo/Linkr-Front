import { styled } from "styled-components"
import { AiOutlineSearch } from "react-icons/ai"
import { useState } from "react"

export default function SearchBar() {

    const [complete, setComplete] = useState(false);
    const [search, setSearch] = useState('')




    return (
        <SearchBox>
            <Search
                placeholder="Search for people"
                onFocus={() => { setComplete(true) }}
                onBlur={() => { setComplete(false) }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <SearchButton>
                <AiOutlineSearch />
            </SearchButton>
            {
                complete &&
                (<AutoCompleteBox>
                    <AutoComplete>
                        <UserIcon />
                        Teste
                    </AutoComplete>
                </AutoCompleteBox>)
            }

        </SearchBox>
    )
}


const SearchBox = styled.div`
    height: 45px;
    width: 30%;
    border-radius: 9px;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color:white;
    z-index: 100;
`


const Search = styled.input`
    height: 95%;
    width: 86%;
    padding-left:20px;
    border-radius:8px;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    z-index: 100;
    input::placeholder{
        color:blueviolet;
    }
`

const SearchButton = styled.button`
    height: 100%;
    width: 10%;
    border: none;
    border-radius: 8px;
    background-color: white;
    font-size: 24px;
    color: lightgray;
    z-index: 100;
    :hover{
        cursor: pointer;
    }
`

const AutoCompleteBox = styled.div`
    position:absolute;
    top:45px;
    left:0px;
    min-height: 50px;
    width: 100%;
    background-color: lightgray;
    border-radius: 12px;
    z-index: 1;
`

const AutoComplete = styled.div`
    height: 45px;
    width: 95%;
    padding-left: 5%;
    color: black;
    display: flex;
    align-items: center;
    z-index: 1;
`

const UserIcon = styled.img`
    border-radius: 1000px;
    height: 90%;
`