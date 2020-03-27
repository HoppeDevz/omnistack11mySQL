import React,  { Component }  from  'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

import heroesImg from '../../assets/heroes.png';
import heroesLogo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { useState } from 'react';
import api from '../../services/api';

export default function Logon() {

        const[ong_hex, setOngHex] = useState('');
        const history = useHistory();

        async function loginHandler(e) {
            e.preventDefault();

            const data = {
                ong_hex
            }

            if (!ong_hex == '') {
                try {
                    const response = await api.post('/getAccountByOngHash', data)

                    //console.log(response.data.result[0].ong_hex);

                    localStorage.setItem('ong_hex', response.data.result[0].ong_hex);
                    localStorage.setItem('ong_name', response.data.result[0].username);

                    history.push('/profile');
                } catch {
                    alert(`Erro ao tentar logar`)
                }
            } else {
                alert('Campos estão vazios!')
            }
        }

        return(
            <div className="logon-container">
                <section className="form">
                    <img src={heroesLogo} alt="Be the hero"/>
                    <form onSubmit={loginHandler}>
                        <h1>Faça seu logon</h1>
                        <input placeholder="Sua ID" value={ong_hex} onChange={e => setOngHex(e.target.value)}/>
                        <button type='submit' class='button'>Entrar</button>
                        <Link to="/register">
                            <FiLogIn />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>
                <img src={heroesImg} alt="Be the Hero"/>
            </div>
        )
}
