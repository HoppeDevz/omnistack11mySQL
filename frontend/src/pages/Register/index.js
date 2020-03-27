import React, { Component } from 'react';
import './styles.css';
import  { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import heroesLogo from '../../assets/logo.svg';
import { useState } from 'react';


export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    //const x =  1

    const history = useHistory();

    async function handlerRegister(e) {
        e.preventDefault();
        const data = {
            username, password, email, whatsapp, city, uf
        }

        if (!username == '' && !email == '' && !whatsapp == '' && !city == '' && !uf == '') {
            try {

                const response = await api.post('/register', data)
            
                alert(`Seu ID: ${response.data.hash}`)
    
                history.push("/")
            } catch {
                alert(`Erro ao tentar criar a conta, tente novamente`)
            }
        } else {
            alert(`Campos Vazios!`)
        }

       
    }

    
    return(
        <div className="register-container">
                <div className="content">
                    <section>
                        <img src={heroesLogo} alt="Be the Hero"/>
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                        <Link className='back-link' to='/'>
                            <FiArrowLeft size={16} color="#e02441"  />
                            Voltar
                        </Link>
                    </section>

                    <form onSubmit={handlerRegister} >
                        <input type='text' placeholder='Nome da ONG' value={username} onChange={e => setUsername(e.target.value)} />
                        <input type="email" placeholder='E-mail' value={email} onChange={e =>  setEmail(e.target.value)} />
                        <input type="whatsapp" placeholder='Whatsapp' value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

                        <div className="input-group">
                            <input type="text" placeholder='Cidade' value={city} onChange={e => setCity(e.target.value)} />
                            <input type="text" placeholder='UF' style={{ width: 80 }} value={uf}  onChange={e => setUf(e.target.value)} />
                        </div>

                        <button className='button' type='submit'>
                            Cadastar
                        </button> 
                    </form>
                </div>
            </div>
    )
}