import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// user profile screen component
const UserProfileScreen = () => {
  const navigation = useNavigation();

  // user profile information
  const userProfile = {
    name: 'John Smith',
    email: 'john@email.com',
    imageUri: require('./assets/flagstaff.jpg'), 
    memberSince: '10/23/2023',
  };

  const UserProfileScreen = () => {
    const navigation = useNavigation();

    const userProfile = {
      name: 'John Smith',
      email: 'john@email.com',
      imageUrl: require('./assets/flagstaff.jpg'),
      memberSince: '10/13/2023',
    }
  }

  // handle user logout
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // navigating to login screen after logout
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      })
      .catch((error) => {
        Alert.alert('Logout Error', error.message);
      });
  };

  // rendering the user profile screen
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <View style={styles.profileCard}>
        <Image
          style={styles.profileImage}
          source={{ uri: userProfile.imageUri }}
        />
        <Text style={styles.nameText}>{userProfile.name}</Text>
        <Text style={styles.emailText}>{userProfile.email}</Text>
        <Text style={styles.sinceText}>Since {userProfile.memberSince}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// styles for the user profile screen
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  profileCard: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  emailText: {
    color: 'gray',
    marginBottom: 4,
  },
  sinceText: {
    color: 'gray',
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
