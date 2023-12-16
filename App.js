import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Colors } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreen from './LoginScreen';
import UserProfileScreen from './UserProfileScreen';
import PasswordScreen from './PasswordScreen';
import ExploreScreen from './ExploreScreen';
import ReserveScreen from './ReserveScreen';
import TripsScreen from './TripsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { auth, firestore, storage } from './firebaseConfig';

// wishlists screen component
const WishlistsScreen = () => (
  <View style={styles.centered}>
    <Text>Wishlists Screen</Text>
  </View>
);

// inbox screen component
const InboxScreen = () => (
  <View style={styles.centered}>
    <Text>Inbox Screen</Text>
  </View>
);

// user authentication functions
const signUpUser = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};

const signInUser = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};

const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

// profile screen component
const ProfileScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={() => alert('Clicked!')}>
        <AntDesign name="bells" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.loginText}>Log In</Text>
    </TouchableOpacity>
  </View>
);

// tab navigator for bottom navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// tab navigator setup
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Explore') {
            iconName = focused ? 'search1' : 'search1';
            return <AntDesign name={iconName} size={24} color="#000000" />;

          } else if (route.name === 'Wishlists') {
            iconName = focused ? 'hearto' : 'hearto';
            return <AntDesign name="hearto" size={24} color="#000000" />

          } else if (route.name === 'Trips') {
            iconName = focused ? 'airbnb' : 'airbnb';
            return <FontAwesome5 name="airbnb" size={24} color="#000000" />

          } else if (route.name === 'Inbox') {
            iconName = focused ? 'message-outline' : 'message-outline';
            return <MaterialCommunityIcons name="message-outline" size={24} color="#000000" />  

          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
            return <AntDesign name={iconName} size={24} color="#000000" />;

          }

        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Wishlists" component={WishlistsScreen} /> 
      <Tab.Screen name="Trips" component={TripsScreen} /> 
      <Tab.Screen name="Inbox" component={InboxScreen} /> 
      <Tab.Screen name="Profile" component={ProfileScreen} />
    
    </Tab.Navigator>
  );
}

// main app component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReserveScreen" component={ReserveScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripsScreen" component={TripsScreen} options={{ headerShown: false }} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}

// styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  }, 
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 44,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  loginText: {
    fontSize: 20,
    marginVertical: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButton: {
    alignItems: 'center',
    marginVertical: 16,
  },

  loginText: {
    fontSize: 20, 
    fontWeight: 'bold',
  },

  
});
