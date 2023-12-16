import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { firestore } from './firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';

// reserve screen component for property reservation
// allows users to view property details and reserve them
const ReserveScreen = ({ route, navigation }) => {
  const { property} = route.params;
  console.log(route.params)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // handle reservation logic on button press
  const handleReservation = async (property) => {
    try {
      const reservationCollection = collection(firestore,"reservations")
            const reservation = {
        propertyId: property.id,
        title: property.title,
        type: property.type,
        price: property.price,
        rating: property.rating,
      };
      console.log(reservation)
      // adding reservation to firestore and logging reference
      const reservationRef = await  addDoc(reservationCollection,reservation)
      console.log(reservationRef)      
      // if (firebase && !firebase?.apps?.length) {
      //   firebase?.initializeApp(firebaseConfig);
      // }

      // const db = firebase?.firestore();
      // const reservation = {
      //   propertyId: property.id,
      //   title: property.title,
      //   type: property.type,
      //   price: property.price,
      //   rating: property.rating,
      // };

      // await db.collection('reservations').add(reservation);

      // alert('Reservation saved!');
    } catch (error) {
      // log and alert error on reservation failure
      console.error('Error saving reservation: ', error);
      alert('Failed to save reservation.');
    }
  };

  // render the reserve screen UI
  return (
    // scroll view for the reserve screen
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={property.imageUrl} style={styles.image} />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <FontAwesome name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="share-alt" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="heart-o" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.homeType}>{`${property.title}`}</Text>
        <Text style={styles.guests}>{`8 guests · 7 bedrooms · 8 beds · 5 bathrooms`}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{`${property.rating} · 47 reviews`}</Text>
        </View>
        <Text style={styles.hostedByText}>{`Hosted by Serkan`}</Text>
        <Text style={styles.descriptionText}>{'Tucked away in the Wasatch Mountain Range and amidst a beautiful aspen grove, you will find our little Cottonwood Chalet--an intimate A-Frame cabin retreat, perfect for small groups.'}</Text>
        <View style={styles.reserveContainer}>
          <Text style={styles.price}>{property.price}</Text>
          <TouchableOpacity style={styles.reserveButton} onPress={()=>handleReservation(property)}>
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// styles for the reserve screen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 44,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  homeType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  guests: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    marginLeft: 8,
    fontSize: 16,
  },
  hostedByText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  reserveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  reserveButton: {
    backgroundColor: '#0000ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default ReserveScreen;
