import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground } from 'react-native'

export default ({activeItemKey, navigation})=>{

    const navigateToScreen = ( route ) =>{
        navigation.navigate(route);
    }
  
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
            </View>
            <View style={styles.screenContainer}>
                <View style={[styles.screenStyle, (activeItemKey=='Login') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (activeItemKey=='Login') ? styles.selectedTextStyle : null]} onPress={()=>navigateToScreen('Login')}>Screen A</Text>
                </View>
                <View style={[styles.screenStyle, (activeItemKey=='SignUp') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (activeItemKey=='SignUp') ? styles.selectedTextStyle : null]} onPress={()=>navigateToScreen('SignUp')}>Screen B</Text>
                </View>
                <View style={[styles.screenStyle, (activeItemKey=='Contacts') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (activeItemKey=='Contacts') ? styles.selectedTextStyle : null]} onPress={()=>tnavigateToScreen('Contacts')}>Screen C</Text>
                </View>
            </View>
        </View>
    )
}
    
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        headerContainer: {
            height: 150,
        },
        headerText: {
            color: '#fff8f8',
        },
        screenContainer: { 
            paddingTop: 20,
            width: '100%',
        },
        screenStyle: {
            height: 30,
            marginTop: 2,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%'
        },
        screenTextStyle:{
            fontSize: 20,
            marginLeft: 20, 
            textAlign: 'center'
        },
        selectedTextStyle: {
            fontWeight: 'bold',
            color: '#00adff'
        },
        activeBackgroundColor: {
            backgroundColor: 'grey'
        }
    });