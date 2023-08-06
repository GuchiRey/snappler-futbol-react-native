import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ModalSaveTeam from '../components/SaveTeam';
import TeamFormation from '../components/TeamFormation';
import { ITeam, IPlayer } from '../Team';
import CustomToast from '../components/CustomToast';

const Dashboard: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [teams, setTeams] = useState<ITeam[]>([]);
  const [teamToUpdate, setTeamToUpdate] = useState({})

  const [notification, setNotification] = useState({
    active: false,
    message: '',
  });
  
  function generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  function openModalCreateTeam() {
    if (teams.length >= 2) {
      setNotification({ active: true, message: 'El máximo de equipos permitidos es de 2' });
      setTimeout(() => {
        setNotification({
          active: false,
          message: ""
        })
      }, 3000);
    } else {
      setIsModalOpen(true);
    }
  }

  function closeModalCreateTeam() {
    setIsModalOpen(false);
    setTeamToUpdate({})
  }

  function createTeam(team: ITeam) {
    team.id = generateUniqueId()
    setTeams((prevTeams) => [...prevTeams, team]);
  }

  function editTeam(team: ITeam) {
    setTeams((prevTeams) => {
      return prevTeams.map((t) => {
        if (t?.id === team?.id) {
          return team;
        } else {
          return t;
        }
      });
    });
    closeModalCreateTeam();
  }

  function openModalEditTeam(team: ITeam){
    setTeamToUpdate(team)
    setIsModalOpen(true);
  }

  return (
    <View>
      {
        notification.active && (
          <CustomToast message={notification.message} />      
        )
      }
      <ScrollView style={styles.container}>
        <ModalSaveTeam isOpen={isModalOpen} onClose={closeModalCreateTeam} teams={teams} teamToUpdate={teamToUpdate} createTeam={createTeam} editTeam={editTeam} />
        <View style={{ marginTop: 40 }}>
          {!teams.length ? (
            <Text style={styles.title}>Actualmente no tienes ningún equipo.</Text>
          ) : teams.length === 1 ? (
            <Text style={styles.title}>Ahora solo falta un buen adversario!</Text>
          ) : (
            <Text style={styles.title}>Ya está todo listo para el enfrentamiento!</Text>
          )}
          <TouchableOpacity onPress={() => openModalCreateTeam()} style={[styles.button, { marginTop: 20 }]}>
            <Text style={styles.buttonText}>CREAR EQUIPO</Text>
          </TouchableOpacity>
          <View style={styles.containerTeams}>
            {teams[0] && <TeamFormation team={teams[0]} openModalEditTeam={openModalEditTeam} />}
            {teams.length > 1 ? (<Text style={{ color: 'white', fontSize: 20, fontWeight: '800', marginTop: 30 }}>VS</Text>) : (<Text></Text>)}
            {teams[1] && <TeamFormation team={teams[1]} openModalEditTeam={openModalEditTeam} />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: '#012942',
    paddingHorizontal: 50,
  },
  containerTeams: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 40
  },
  title: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center'
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
  },
});

export default Dashboard;
