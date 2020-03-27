import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    header: {
        marginTop: Constants.statusBarHeight + 20,
        marginHorizontal: 20,
    },

    titleHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 32,
        marginBottom: 30,
    },

    incidentInfo: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 12,   
        margin: 20, 
    },
    
    incidentDesc: {
        fontWeight: "bold",
    },

    incidentValue: {
        color: "#717180",
        marginBottom: 15,       
    },

    buttonsContact: {
        alignItems: 'flex-start',
        flexDirection:'row',
    },

    buttonContact: {
        padding: 10,
        marginHorizontal: 20,
        backgroundColor: "#E02041",
        borderRadius: 8,
    },

    textButton: {
        color: "white",
        fontWeight: "bold",
    },
})