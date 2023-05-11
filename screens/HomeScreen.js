import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {useNavigation} from "@react-navigation/native"
import { SafeAreaView, Image} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TextInput } from 'react-native';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import 'react-native-url-polyfill/auto';
import Categories from '../components/Categories';
// import { AppRegistry } from 'react-native';
// import category from '../sanity/schemas/category';






const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeateredCategories] = useState([]);

    useLayoutEffect(() =>{
          navigation.setOptions({
            headerShown: false,
          });
    },[]);

    useEffect(() => {
      sanityClient.fetch(
      `
      *[_type == "featured"] {
        ...,
      restaurants[]->{
        ...,
        dishes[]->
      }    
      }
      `
    )
    .then(data => {
      setFeateredCategories(data);
    });
    }, []);

    // console.log(featuredCategories)

  return (
    <SafeAreaView className=' bg-slate-100 pt-10 pb-32  px-4'>
      {/* <Text></Text> */}

      {/* Header */}
      <View className="flex-row pb-3 items-center  space-x-2">
        <Image 
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className='  flex-1'>
          <Text className='font-bold text-gray-400 text-xs'> 
            Deliver Now  </Text>
          <Text className='font-bold text-xl '>
            Curent location    

            <FontAwesome    
              name='chevron-down'   
              size={20} 
              color={"#00CCBB"} 
              onPress={() => console.log("Instagram")}
            />
          </Text>
        </View>
        <Ionicons  name='person-outline'  size={30} color={"#00CCBB"} />
      </View>



      {/* Search */}
      <View className='flex-row items-center space-x-2 pb2 '>
        <View className='flex-row space-x-2 flex-1 rounded-3xl bg-gray-200 p-3' >
          <Ionicons name='search' size={20}
          color={"gray"}/>
          <TextInput placeholder='Restaurant and cuisines'
            keyboardType='default'
          />
        </View>
        <Ionicons
          name='options-outline'
          size={35}
          color={"#00CCBB"}
        />
      </View>


      {/* Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Categoreis */}
        <Categories/>
          
        {/* Featurd Rows */}
          {featuredCategories?.map(category =>(
            <FeaturedRow 
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            />
          ))}
          
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen  