import React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },  


    textBold: {
        fontWeight: "bold",
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: "#13131A",
        fontWeight: "bold",
    },


    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#737380",
    },

    incidentsList: {
        marginTop: 32,
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 16,
    },

    IncidentValue: {
        marginBottom: 16,
        color: "#737380",
    },

    detailsButton: {
        backgroundColor: "#E02041",
        padding: 10,
        marginTop: 16,
        borderRadius: 5,
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },

    iconArrow: {
        color: "white",
    },
})