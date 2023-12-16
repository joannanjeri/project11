import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// screen width for responsive design
const screenWidth = Dimensions.get('window').width;

// data for properties
const propertiesData = [
  {
    id: '1',
    title: 'Epitome of Modern Luxury in New Two Bedroom Unit',
    rating: '4.9',
    type: 'Private room',
    price: '$50 night',
    imageUrl: require('./assets/flagstaff.jpg'),
  },
  {
    id: '2',
    title: 'Cottonwood Chalet',
    rating: '4.8',
    type: 'Private room',
    price: '$100 night',
    imageUrl: require('./assets/cabin.jpg'), 
  },
];

// data for categories
const categoriesData = [
  { name: 'Cabins', icon: 'home' },
  { name: 'Trending', icon: 'fire' },
  { name: 'Play', icon: 'gamepad-square' },
  { name: 'City', icon: 'city' },
  { name: 'Beachfront', icon: 'umbrella-beach' },
];

// explore screen component
const ExploreScreen = () => {
    const navigation = useNavigation(); 

    // render property card
    const renderProperty = ({ item }) => {
      const imageSource = typeof item.imageUrl === 'string' && item.imageUrl.startsWith('http') 
        ? { uri: item.imageUrl }
        : item.imageUrl;
  
      // property card touchable
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ReserveScreen', { property: item })}
          style={styles.propertyCard}
        >
          <Image source={imageSource} style={styles.propertyImage} />
          <View style={styles.propertyDetails}>
            <Text style={styles.propertyTitle}>{item.title}</Text>
            <Text style={styles.propertyType}>{item.type}</Text>
            <View style={styles.propertyBottomRow}>
              <Text style={styles.propertyPrice}>{item.price}</Text>
              <View style={styles.rating}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text style={styles.propertyRating}>{item.rating}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

  // render the explore screen UI
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons name="ios-search" size={20} color="grey" style={styles.searchIcon} />
        <TextInput
          placeholder="Where to?"
          placeholderTextColor="grey"
          multiline
          style={styles.searchInput}
        />
        <MaterialIcons name="filter-list" size={24} color="black" style={styles.filterIcon} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categoriesData.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <MaterialCommunityIcons name={category.icon} size={24} color="black" />
            <Text style={styles.categoryButtonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={propertiesData}
        renderItem={renderProperty}
        keyExtractor={item => item.id}
        style={styles.propertiesList}
      />
    </SafeAreaView>
  );
};

// styles for the explore screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchIcon: {
    marginRight: 8,
  },

  
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },

  filterIcon: {
    padding: 8,
  },

  filterButton: {
    marginLeft: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
//   categoriesContainer: {
//     paddingHorizontal: 10,
//     justifyContent: 'space-between',
//   },
  categoryButton: {
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 15,
  },
  categoryButtonText: {
    fontSize: 14,
    marginTop: 5,
  },
  propertiesList: {
    marginTop: 10,
  },
  propertyCard: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: screenWidth * 0.5,
  },
  propertyDetails: {
    padding: 10,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyType: {
    color: '#888',
    marginBottom: 5,
  },
  propertyBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyRating: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default ExploreScreen;
