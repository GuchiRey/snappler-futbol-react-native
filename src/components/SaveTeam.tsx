import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { teamsServices } from '../services/teams';
import { IPlayer } from '../Team';

const ModalCreateTeam = (props: any) => {
  const { isOpen, onClose, teams, teamToUpdate, createTeam, editTeam } = props;

  const [loading, setLoading] = useState(false);
  const [searchedPlayer, setSearchedPlayer] = useState('');
  const [team, setTeam] = useState({
    name: '',
    players: [],
    id: '',
  });

  useEffect(() => {
    if (teamToUpdate && teamToUpdate.id) {
      const players: never[] = teamToUpdate.players as never[];
      setTeam({
        name: teamToUpdate.name,
        players,
        id: teamToUpdate.id
      });
    }
  }, [teamToUpdate]);''

  async function addPlayer() {
    setLoading(true);
    const player = await teamsServices.addPlayer(searchedPlayer);
    let error = false;
    if (!player) {
      setNotification({ active: true, message: `El jugador "${searchedPlayer}" no se encuentra en ApiFotball` });
      error = true;
    } else {
      if (team.players.some((p: IPlayer) => p.player_name === player.player_name)) {
        setNotification({ active: true, message: `El jugador "${searchedPlayer}" ya está en su equipo` });
        error = true;
      } else {
        const isPlayerInOtherTeam = Object.values(teams).some(
          (team: any) => team.id !== teamToUpdate.id && team.players.some((p: IPlayer) => p.player_name === player.player_name)
        );
        if (isPlayerInOtherTeam) {
          setNotification({ active: true, message: `El jugador "${searchedPlayer}" ya está en otro equipo` });
          error = true;
        } else {
          if (team.players.length >= 5) {
            setNotification({ active: true, message: `El equipo puede tener un máximo de 5 jugadores.` });
            error = true;
          } else {
            setTeam((prevTeam: any) => ({ ...prevTeam, players: [...prevTeam.players, player] }));
            setSearchedPlayer("");
          }
        }
      }
    }
    if (error) {
      setTimeout(() => {
        setSearchedPlayer("");
        setNotification({
          message: "",
          active: false
        })
      }, 3000);
    }
    setLoading(false);
  }

  function removePlayer(player: IPlayer) {
    setTeam((prevTeam: any) => ({
      ...prevTeam,
      players: prevTeam.players.filter((p: IPlayer) => p.player_name !== player.player_name),
    }));
  }

  const [notification, setNotification] = useState({
    active: false,
    message: ""
  });

  const handleClose = () => {
    setNotification({...notification, active: false});
  };

  function saveTeam() {
    if(!team.name) {
      setNotification({ active: true, message: `Nombre de equipo requerido` });
      setTimeout(() => {
        setNotification({
          message: "",
          active: false
        })
      }, 3000);
      return 
    } 
    if(teamToUpdate?.id) {
      editTeam(team)
    } else {
      createTeam(team)
    }
    closeModal()
  }

  function closeModal() {
    setTeam({ name: "", players: [], id: "" });
    onClose()
  }

  const CustomToast = () => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>{notification.message}</Text>
    </View>
  );

  return (
    <View style={{ position: 'relative' }}>
      <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
        {
          notification.active && (
            <CustomToast />      
          )
        }
        <View style={styles.modalContainer}>
          <View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.iconClose}>X</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { marginBottom: 30 }]}>{team.id ? 'Editar' : 'Crear'} equipo</Text>
            <TextInput
              placeholder="Nombre del equipo"
              placeholderTextColor="white"
              style={styles.textInput}
              value={team.name}
              onChangeText={(value) => setTeam({ ...team, name: value })}
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
              <TextInput
                placeholder="Nombre del equipo"
                placeholderTextColor="white"
                style={[styles.textInput, { width: '55%', marginBottom: 0 }]}
                value={searchedPlayer}
                onChangeText={(value) => setSearchedPlayer(value)}
              />
              <TouchableOpacity onPress={() => addPlayer()} style={[styles.buttonSmall, { width: '40%' }]}>
                {
                  loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.buttonTextSmall}>AGREGAR</Text>
                  )
                }
              </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.title, { marginVertical: 20, textAlign: 'left' }]}>Lista de Jugadores</Text>
              <Text style={{ color: 'white', marginLeft: 5 }}>{"(max 5)"}</Text>
            </View>
            { !team.players.length && (<Text style={styles.listItem}>No hay jugadores</Text>) }
            <SafeAreaView>
              <FlatList
                data={team.players}
                renderItem={({ item, index }: { item: IPlayer, index: number }) => (
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={styles.listItem}>{index+1}- {item.player_name}</Text>
                    <Text onPress={() => removePlayer(item)} style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>X</Text>
                  </View>
                )}
              />
            </SafeAreaView>
          </View>
          <TouchableOpacity onPress={() => saveTeam()} style={styles.button}>
            <Text style={styles.buttonText}>{team.id ? 'EDITAR' : 'CREAR'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: 20,
    backgroundColor: '#012942',
  },
  iconClose: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
  },
  listItem: {
    color: 'white',
  },
  button: {
    backgroundColor: '#d83180',
    color: 'white',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 45,
    fontWeight: '600',
  },
  buttonSmall: {
    backgroundColor: '#d83180',
    color: 'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonTextSmall: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'white'
  },
  playerList: {
    flex: 1,
    marginBottom: 20,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  playerName: {
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
});

export default ModalCreateTeam;
