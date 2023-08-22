import { styled } from "styled-components";

export default function UsersFound(props) {
  const { image, userName } = props;
  return (
    <UserFoundContainer>
      <img src={image} />
      <h1>{userName}</h1>
    </UserFoundContainer>
  );
}

const UserFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #515151;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 5px;
  }
  img {
    width: 39px;
    height: 39px;
    border-radius: 304px;
  }
`;
