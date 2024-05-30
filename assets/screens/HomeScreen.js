import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

const { width: viewportWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [likedItems, setLikedItems] = useState(Array(dummyData?.length).fill(false));
  const [numColumns, setNumColumns] = useState(2);

  const carouselItems = [
    {
      image: require('../IMG/Img1.jpg'),
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

  const dummyData = [
    { id: 0, image: require('../IMG/Girl1.jpg'), name: 'Priti', price: '$99.99' },
    { id: 1, image: require('../IMG/Girl2.jpg'), name: 'Pritiqs', price: '$99.99' },
    { id: 2, image: require('../IMG/Girl3.jpg'), name: 'Pritisddq', price: '$99.99' },
    { id: 3, image: require('../IMG/Girl4.jpg'), name: 'Pritilo', price: '$99.99' },
    { id: 4, image: require('../IMG/Girl5.jpg'), name: 'Pritdi', price: '$99.99' },
    { id: 5, image: require('../IMG/Girl6.jpg'), name: 'Priti', price: '$99.99' },
  ];

  const toggleLike = (index) => {
    const updatedLikedItems = [...likedItems];
    updatedLikedItems[index] = !updatedLikedItems[index];
    setLikedItems(updatedLikedItems);
  };

  const renderItemDATA = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <MaterialCommunityIcons name="heart" size={20} color={likedItems[item.id] ? 'red' : 'gray'} />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
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
          itemWidth={viewportWidth - 0}
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
            </View>
          ))}
        </ScrollView>
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Popular</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.popularContainer}>
          <FlatList
            data={dummyData}
            renderItem={renderItemDATA}
            keyExtractor={item => item.id.toString()} 
            horizontal={false}
            numColumns={numColumns}
            key={numColumns}
          />
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
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 20,
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
    borderRadius: 5,
    backgroundColor: 'brown',
  },
  inactivePaginationDot: {
    backgroundColor: 'gray',
    width: 10,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'brown',
  },
  viewAll: {
    fontSize: 16,
    color: 'gray',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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
  popularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
    width: (Dimensions.get('window').width / 2) - 20,
    marginLeft: 10,
    marginRight: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeScreen;
