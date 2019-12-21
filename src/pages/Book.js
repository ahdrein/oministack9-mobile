import React, { useState, useEffect } from 'react'
import {StatusBar, Dimensions, View, ScrollView, SafeAreaView, Alert, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import Button from '../components/Button'

import api from '../services/api'

export default function Book({ navigation })  {
    const id = navigation.getParam('id') // spot
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [timeAvailabel, setTimeAvailabel] = useState([])

    useEffect(() => {
        setDate(Moment(new Date()).format('DD-MM-YYYY'))
        let user_id
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                console.log("user_id",user)
                async function loadTimeAvailabel() {
                    const timeAvailabelResponse = await api.get(`/timeAvailabel`, {
                        headers: {
                            user_id: user
                        }
                    })
                    console.log(timeAvailabelResponse.data)

                    setTimeAvailabel(timeAvailabelResponse.data)
                }
                loadTimeAvailabel()
            }
        })

    }, [])

    addTime = time => {
        setTime(time)
    }
    
    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user')

        const response = await api.post(`/spots/${id}/bookings`, {
            date, time
        }, {
            headers: { user_id}
        })

        const { _id } = response.data.user;

        Alert.alert('Solicitação de reserva enviada.')
        
        navigation.navigate('List')
    }

    async function handleCancel() {
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.label}>DATA DE INTERESSE*</Text>
            <DatePicker style={styles.datePicker} 
            style={{width: 200}}
            date={date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-12-2019"
            maxDate="01-01-2020"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
                },
                dateInput: {
                marginLeft: 36
                }
            }}
            onDateChange={(date) => {setDate(date)}}
            />

            <Text style={styles.label}>HORÁRIOS DISPONIVEL*</Text>
            <View style={styles.buttons}>
            {
                timeAvailabel.map(t => (
                    t.available ?
                        <Button  key={t._id} label={t.time} onClick={() => setTime(t.time)} />
                    : null
                ))
            }
            </View>


            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
      margin: 20,
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
        marginTop: 30,
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
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    datePicker: {
        margin: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20,
    }
  });
  