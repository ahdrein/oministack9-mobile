import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List()  {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            if (storagedTechs) {
                const techsArray = storagedTechs.split(',').map(tech => tech.trim())
                setTechs(techsArray)
            }
        })
    }, [])


    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo}></Image>
            <ScrollView>
            {
                techs.map(tech => (
                    <SpotList key={tech} tech={tech}></SpotList>
                ))
            }
            </ScrollView>

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 14
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }
})