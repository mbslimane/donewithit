import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../feautres/restaurantSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Progress from "react-native-progress"
import MapView, {Marker} from 'react-native-maps'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant);


  return (
   <View className='bg-[#00CCBB] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between p-5 items-center'>
          <TouchableOpacity className='flex-row'>
              <Ionicons 
              name='close-outline'
              size={30}
              color={'white'}
              onPress={() => navigation.navigate("Home")}
            />
          </TouchableOpacity>
          <Text className='font-light text-white text-lg'>Order Help</Text>
        </View>
        
        <View className='bg-white mx-5 my-2 rounded-md p-6 shadow-md z-50'>
         <View className='flex-row justify-between'>
            <View>
                <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                <Text className='text-3xl font-bold'>45-55 Minutes</Text>
              </View>
              <Image
              source={{ 
                uri:'https://links.papareact.com/fls'
              }}
                className='h-20 w-20'
              />
         </View>  
         
         <Progress.Bar color='#00CCBB' indeterminate={true}/>

         <Text>
          Your order at {restaurant.title} is being prepared
         </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        className="flex-1 -mt-10 z-0"
        mapType='mutedStandard'
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          identifier='origin'
          pinColor='#00CCBB'
          />
        </MapView>

        <SafeAreaView className='flex-row items-top bg-white space-x-5'>
          <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className={'h-12 w-12 rounded-full p-4 bg-gray-300 ml-5 self-center mb-3'}
          />

          <View className='flex-1 '>
            <Text className='text-lg'>
              Slimane MB 
            </Text>
            <Text className='text-gray-400'>
              Your Rider
            </Text>
          </View>
          <Text className=' text-[#00CCBB] text-lg mr-5 font-bold' >Call </Text>
        </SafeAreaView>
   </View>
  )
}

export default DeliveryScreen