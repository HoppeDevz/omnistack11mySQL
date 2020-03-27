import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation }  from '@react-navigation/native';
import styles from './styles';
import { HeaderTitle } from '@react-navigation/stack';
import api from '../../services/api'


export default function Incidents() {

    const [incidents, setIncidents] = useState([])

    const navigation = useNavigation();
    function NavigationToDetail(incident) {
        navigation.navigate('Details', {incident});
    }

    async function loadIncidents() {
        const response = await api.get("incidents");

        setIncidents(response.data.data)
        console.log(response.data.data)
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Image source={logoImg} />
                    <Text style={styles.headerText}>Total de <Text style={styles.textBold}>{incidents.length} casos</Text></Text>
                </View>
            </View>
            
            <Text style={styles.title}> Bem vindo! </Text>
            <Text style={styles.description}> Escolha um dos casos e salve o dia </Text>

            <FlatList style={styles.incidentsList} 
            data={incidents}
            keyExtractor={incidents => String(incidents.ID)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: incidents}) => (
                <View style={styles.incident}>
                    <Text style={styles.IncidentProperty}>ONG:</Text>
                    <Text style={styles.IncidentValue}>{incidents.name}</Text>

                    <Text style={styles.IncidentProperty}>CASO:</Text>
                    <Text style={styles.IncidentValue}>{incidents.title}</Text>

                    <Text style={styles.IncidentProperty}>VALOR:</Text>
                    <Text style={styles.IncidentValue}>{incidents.value}</Text>

                    <TouchableOpacity 
                    style={styles.detailsButton}  
                    onPress={() => NavigationToDetail(incidents)} 
                    >
                        <Text style={styles.buttonText}>
                        <Feather name="arrow-right" size={16} color="#737380" style={styles.iconArrow}/>
                        Ver mais detalhes
                        </Text>
                        
                    </TouchableOpacity>
                </View>
            )}
            >
            </FlatList>

        </View>
    );
}