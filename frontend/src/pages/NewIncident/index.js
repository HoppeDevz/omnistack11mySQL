import React, { Component } from 'react';
import './style.css';
import  { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import heroesImg from '../../assets/heroes.png';
import heroesLogo from '../../assets/logo.svg';
import { useState } from 'react';
import api from '../../services/api';

export default function NewIncident() {
    //render() {

        const [title, setTitle] = useState('')
        const [description, setDesc] = useState('')
        const [value, setValue] = useState('')

        const ong_hex = localStorage.getItem('ong_hex');
        const ong_name = localStorage.getItem('ong_name');

        async function RegisterIncidentHandler(e) {
            e.preventDefault();

            if (!title == '' && !description == '' && !value == '' ) {
                try {
                    const data = {
                        title, description, value
                    }
                    const response = await api.post('/createNewIncident', data, {
                        headers: {
                            Authorization: ong_hex
                        }
                    })

                    alert(`Caso criado com sucesso!`)
                } catch {
                    alert(`Erro ao cadastrar novo caso!`)
                }
            } else {
                alert(`Campos Vazios!`)
            }
        }

        return(
            <div className="registerincident-container">
                <div className="content">
                    <section>
                        <img src={heroesLogo} alt="Be the Hero"/>
                        <h1>Cadastrar novo caso</h1>
                        <p>Cadastre um caso.</p>

                        <Link className='back-link' to='/'>
                            <FiArrowLeft size={16} color="#e02441"  />
                            Voltar para home
                        </Link>
                    </section>

                    <form onSubmit={RegisterIncidentHandler}>
                        <input type='text' placeholder='Titulo do caso' value={title} onChange={e => setTitle(e.target.value)} />
                        <textarea placeholder='Descrição' value={description} onChange={e => setDesc(e.target.value)} />

                        <input type="number" placeholder='Valor em reais' value={value} onChange={e => setValue(e.target.value)} />


                        <button className='button' type='submit'>
                            Cadastar
                        </button> 
                    </form>
                </div>
            </div>
        )
    //}
}