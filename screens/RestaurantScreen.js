import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useRoute, useNavigation } from "@react-navigation/native"
import { urlFor } from '../sanity';
import Ionicons from '@expo/vector-icons/Ionicons'
import DishRow from '../components/DishRow';
import Basketicon from '../components/Basketicon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../feautres/restaurantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

    const {params:{
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    }} = useRoute();


    useEffect (() => {
      dispatch(
        setRestaurant({
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
      })
      );
    }, [])

    useLayoutEffect(() => {
      navigation.setOptions({

        headerShown: false,
      });
    }, [])

  return (
    <>
      <Basketicon className={'bg-red-800 h-20'  }/>

      <ScrollView>
        <View className='relative'>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className='w-full h-56 bg-gray-300 p-4' 
          />
          <TouchableOpacity 
            onPress={navigation.goBack }  
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full ">
            
            <Ionicons 
            name="arrow-back-outline"
            size={20}
            color="#00CCBB"
            />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                <View className=" flex-row items-center space-x-1">
                  <Ionicons
                    name='star'
                    color={'green'}
                    opacity={0.5}
                    size={22}
                  />
                  <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text> .{genre}
                  </Text>
                </View>

                <View className=" flex-row items-center space-x-1">
                  <Ionicons
                    name='location'
                    color={'gray'}
                    opacity={0.4}
                    size={22}
                  />
                  <Text className="text-xs text-gray-500">
                    Nearby .{address}
                  </Text>
                </View>
              </View>

              <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
            </View>
            <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-500" >
              <Ionicons 
                name='help-circle-outline'
                size={20}
                color={"gray"}
                opacity={0.6}
              />
              <Text className="pl-2 flex-1 text-md font-bold">
                Have a food alrady
              </Text>
              <Ionicons
                name='chevron-forward-outline'
                size={20}
                color={"#00CCBB"}
              />
            </TouchableOpacity>
        </View>

        <View className={'pb-36'}>
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* DishRows */}
          {dishes.map(dish =>(
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ) 
          )}
        </View>
        
      </ScrollView>
    </>
  )
}

export default RestaurantScreen