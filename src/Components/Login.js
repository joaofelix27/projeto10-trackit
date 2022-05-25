import styled from 'styled-components';
import login from "../assets/images/login.png"
function Login() {
  return (
    <Container>
      <img src={login} alt="logo" />
      <form>
      <input type="email" placeholder='email' ></input>
      <input type="password" placeholder='senha' ></input>
      <button></button>
      </form>
      
    </Container>
  )
}
export default Login;
const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width: 100%;
  cursor: pointer;
  padding: 0 36px;
  padding-top: 68px;
  padding-bottom:169px;
  box-sizing: border-box;
  

  
  input{
    height: 45px;
    width: 303px;
    border-radius: 5px;
    margin-bottom:6px;
    border: 1px solid #D4D4D4;
    background-color: #FFFFFF;
  }

  img {
    height: 180px;
    width: 180px;
    margin-bottom:33px;
  }
`;