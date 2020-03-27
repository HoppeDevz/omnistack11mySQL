import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css';
import api from '../../services/api';

export default function Register() {

    const [incidents, setIncidents] = useState([]);

    const ong_name = localStorage.getItem('ong_name');
    const ong_hex = localStorage.getItem('ong_hex');
    const history = useHistory();

    async function DeleteHandler(id) {
        try {
            const data = {
                id
            }
            const response = await api.post('/DeleteIncident', data, {
                headers: {
                    Authorization: ong_hex
                }
            })

            alert(`Caso deletado com sucesso!`)
        } catch {
            alert('Erro ao tentar deletar este caso!')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    useEffect(() => {
        api.get('/getIncidentsOfaUser', {
            headers: {
                Authorization: ong_hex
            }
        }).then(response => {
            setIncidents(response.data.data);
            console.log(response.data.data)
        })
    }, [ong_hex]);

    //render() {
        return(
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be the Hero"/>
                    <span>Bem vinda, {ong_name}</span>
                    <Link className='button' to='incidents/NewIncident'>Cadastrar novo caso</Link>
                    <button type='button'>
                        <FiPower size={18} color='#E02041' onClick={handleLogout} />
                    </button>
                </header>

                <h1>Casos Econtrados</h1>

                <ul>
                    {incidents.map(incidents => (
                        <li>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(incidents.value)}</p>

                        <button type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' onClick={() => DeleteHandler(incidents.ID)}/>
                        </button>
                    </li>
                    ))}
                </ul>

            </div>
        )
   // }
}