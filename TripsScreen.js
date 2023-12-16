import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { firestore } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

// trips screen component for viewing reservations
// displays a list of upcoming reservations
const TripsScreen = () => {
  const [reservations, setReservations] = useState([]);

  // fetch reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // fetch reservations from firestore and set state
        const querySnapshot = await getDocs(collection(firestore, 'reservations'));
        const fetchedReservations = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(fetchedReservations);
      } catch (error) {
        console.error('Error fetching reservations: ', error);
      }
    };

    fetchReservations();
  }, []);

  // render item for reservation list
  const renderReservationItem = ({ item }) => (
    // reservation card component
    <View style={styles.reservationCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.propertyImage} />
      <View style={styles.reservationDetails}>
        <Text style={styles.reservationTitle}>{item.title}</Text>
        <Text style={styles.reservationSubtitle}>{item.description}</Text>
      </View>
      <View style={styles.reservationTag}>
        <Text style={styles.reservationTagText}>In 2 days</Text>
      </View>
    </View>
  );

  // render the trips screen UI
  return (
    // view for the trips screen
    <View style={styles.container}>
      <FlatList
        data={reservations}
        renderItem={renderReservationItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.upcomingReservationsText}>Upcoming reservations</Text>}
      />
    </View>
  );
};

// styles for the trips screen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  upcomingReservationsText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  reservationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 20,
    marginTop: 0,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  reservationDetails: {
    padding: 20,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reservationSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  reservationTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  reservationTagText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TripsScreen;
