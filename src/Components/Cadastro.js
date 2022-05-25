import styled from 'styled-components';
import login from "../assets/images/login.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [disabled, setDisabled]=useState(false)
    const navigate = useNavigate();

    function teste (event) {
        event.preventDefault();
        
        if (email!=="") {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`;
            const profileData = {email:email,
                name:nome,
                image:foto,
                password:senha 
            }
            console.log(profileData)
            const promise = axios.post(URL,profileData);
            setDisabled(true)
        
            promise.then(response => {
            console.log("entrei no post")
              const { data } = response;
              console.log(data)
              navigate('/')
            });
        
            promise.catch(err => {
                console.log("entrei no erro")
              const message = err.response.statusText;
              alert("Erro no cadastro!");
              setDisabled(false)
            })
        }
      
    }

    function montarFormularioCadastro (){
        return (
            
            <form>
                <input type="email" placeholder='email' disabled={disabled} onChange={e => setEmail(e.target.value )} ></input>
                <input type="password" placeholder='senha' disabled={disabled} onChange={e => setSenha(e.target.value )} ></input>
                <input type="text" placeholder='nome' disabled={disabled} onChange={e => setNome(e.target.value )} ></input>
                <input type="text" placeholder='foto' disabled={disabled} onChange={e => setFoto(e.target.value )} ></input>
                <button type="submit">Cadastrar</button>
                <Link to="/" style={{ color: '#52B6FF' }}>
                    <h1>Já tem uma conta? Faça login!</h1>
                </Link>
            </form>
        )
       

    }
    const formularioCadastro = montarFormularioCadastro ()

    return (
        <Container>
            <img src={login} alt="logo" />
          <FormularioCadastro onSubmit ={teste}>{formularioCadastro}</FormularioCadastro>
        </Container>
    )
}
export default Cadastro;

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

  img {
    height: 180px;
    width: 180px;
    margin-bottom:33px;
  }
`;
const FormularioCadastro = styled.div`
  form{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  
  input{
    height: 45px;
    width: 303px;
    border-radius: 5px;
    margin-bottom:6px;
    border: 1px solid #D4D4D4;
    background-color: #FFFFFF;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    color: #DBDBDB;
    padding-left:11px;
    padding-bottom:11px;
    padding-top:9px;

  }


  button {
    height: 45px;
    width: 303px;
    border-radius: 4.6px;
    background-color: #52B6FF;
    border: 0;
    font-family: Lexend Deca;
    font-size: 21px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    color: #FFFFFF;
    margin-bottom:25px;
  }
  h1{
    font-family: Lexend Deca;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #52B6FF;
  }
`;