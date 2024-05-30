import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const { width: viewportWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = React.useState(0);

  const carouselItems = [
    {
      image: require('../IMG/Img1.jpg'), // Replace with your image paths
    },
    {
      image: require('../IMG/Img2.jpg'),
    },
    {
      image: require('../IMG/Img3.jpg'),
    },
  ];

  const categories = [
    { name: 'Menswear', icon: 'tshirt-crew-outline' },
    { name: 'Shoes', icon: 'shoe-sneaker' },
    { name: 'Electronics', icon: 'laptop' },
    { name: 'Home', icon: 'home-outline' },
    { name: 'Sports', icon: 'basketball' },
    { name: 'Beauty', icon: 'lipstick' },
    { name: 'Books', icon: 'book-outline' },
    { name: 'Toys', icon: 'toy-brick-outline' },
    { name: 'Groceries', icon: 'cart-outline' },
    { name: 'Jewelry', icon: 'ring' },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (activeSlide + 1) % carouselItems.length;
        carouselRef.current.snapToItem(nextIndex);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [activeSlide]);

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={1}>
          <MaterialCommunityIcons name="menu" size={20} color="brown" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ushion</Text>
        <TouchableOpacity activeOpacity={1}>
          <MaterialCommunityIcons name="cart" size={20} color="brown" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="gray"
          />
          <Ionicons name="filter" size={20} color="gray" style={styles.filterIcon} />
        </View>
        <Carousel
          ref={carouselRef}
          layout={"default"}
          data={carouselItems}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth - 60}
          renderItem={renderItem}
          loop={true}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.inactivePaginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <MaterialCommunityIcons name={category.icon} size={30} color="brown" />
              {/* <Text style={styles.categoryText}>{category.name}</Text> */}
            </View>
          ))}
        </ScrollView>
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Popular</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'brown'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 20,
    width: '90%',
    paddingHorizontal: 10,
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterIcon: {
    marginLeft: 10,
  },
  carouselItem: {
    // backgroundColor: 'red',
    borderRadius: 10,
    height: 140,
    overflow: 'hidden',
    marginLeft: 20,
    marginRight: 25,
    marginBottom: 20,
    marginTop: 25
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    top: 220,
    width: '100%',
  },
  paginationDot: {
    width: 20,
    // height: 10,
    borderRadius: 5,
    // marginHorizontal: 8,
    backgroundColor: 'brown',
  },
  inactivePaginationDot: {
    backgroundColor: 'gray',
    width: 10,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'brown',
  },
  viewAll: {
    fontSize: 14,
    color: 'blue',
  },
  categoriesContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  categoryText: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      {/* Other screens */}
    </Stack.Navigator>
  );
};

export default App;
