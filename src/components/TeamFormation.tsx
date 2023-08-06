import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ITeam, IPlayer } from '../interfaces/Team';

const TeamFormation = (props: { team: ITeam; openModalEditTeam: any; }) => {
  const { team, openModalEditTeam } = props;
  const playerNames = team.players.map((player: IPlayer) => player.player_name);
  const playersString = playerNames.join(', ');

  return (
    <View style={styles.boxTeam}>
      <Text style={styles.titleForm}>{team.name}</Text>
      <View style={styles.container}>
        <Text style={styles.titleForm}>Equipo {playerNames.length >= 5 ? "completo" : "formado"} por:</Text>
        <Text style={[styles.playersString, { marginTop: 15, marginBottom: 30, textAlign: 'center' }]}>{playersString ? playersString : 'Sin jugadores'}</Text>
        <TouchableOpacity onPress={() => openModalEditTeam(team)} style={[styles.button, { marginTop: 20 }]}>
            <Text style={styles.buttonText}>EDITAR</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

type StadiumPlayersStyles = { [key: string]: any };

const styles: StyleSheet.NamedStyles<any> & StadiumPlayersStyles = StyleSheet.create({
  boxTeam: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    minWidth: 300,
    width: 275,
    padding: 20,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
  titleForm: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  playersString: {
    color: 'white',
    marginVertical: 30,
    marginHorizontal: 'auto',
    maxWidth: 315
  },
  button: {
    backgroundColor: '#d83180',
    color: 'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 45,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default TeamFormation;
