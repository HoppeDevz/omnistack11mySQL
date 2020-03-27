import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImgLogo from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';


export default function Details() {

    const route = useRoute();
    const incident = route.params.incident
    console.log(incident)

    const message = `Olá APAD, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de R$ ${incident.value} `

    function SendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [`${incident.email}`],
            body: message
        })
    }

    /*function getIncidentById() {
        api.post("getIncidentByID")
        .then(res => {
            setIncident(res.data.data)
            console.log(incident)
        })
    }*/




    function SendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5535988182462&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={ImgLogo} />
                <Text style={styles.titleHeader}>Entre em contato</Text>
            </View>    

                <View style={styles.incidentInfo}>
                    <Text style={styles.incidentDesc}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentDesc}>DESCRIÇÃO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentDesc}>VALOR:</Text>
                    <Text style={styles.incidentValue}>R$ {incident.value}</Text>
                </View>

                <View style={styles.buttonsContact}>
                    <TouchableOpacity style={styles.buttonContact} onPress={SendWhatsapp} >
                        <Text style={styles.textButton} > <Feather name="smartphone" size={16} color="#fff" /> Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContact} onPress={SendMail}>
                        <Text style={styles.textButton} > <Feather name="mail" size={16} color="#fff" /> E-mail</Text>
                    </TouchableOpacity>
                </View>

        </View>
    )
}