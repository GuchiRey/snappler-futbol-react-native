import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome: React.FC = () => {
  const navigation : any = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 40 }]}>
        ¿Alguna vez soñaste con ver un partido de fútbol en donde se enfrenten tus jugadores favoritos?{'\n'}
        Imaginate poder armar dos equipos de 5 jugadores cada uno, en donde no tengas ninguna limitación... posición, presupuesto, contrato, club, edad... tu mente es tu límite.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>COMENZAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
  },
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#012942',
    paddingHorizontal: 50,
  },
  button: {
    backgroundColor: '#d83180',
    color: 'white',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 45,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Welcome;
