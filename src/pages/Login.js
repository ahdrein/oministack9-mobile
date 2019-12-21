import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, Plataform, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api'

import logo from '../assets/logo.png'

export default function Login({ navigation  })  {
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List')
            }
        })
    }, [])

    async function handleSubmit() {
        //console.log(email, techs)
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data.user;

        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', techs)

        //console.log(techs);
        navigation.navigate('List')
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL*</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    //onChangeText={text => setEmail(text)}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS*</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Tecnologias de Interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    //onChangeText={text => setEmail(text)}
                    onChangeText={setTechs}

                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,

    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,

    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
  });
  