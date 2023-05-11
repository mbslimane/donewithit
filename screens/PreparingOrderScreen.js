import { View, Text } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import React,{useEffect} from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import {useNavigation} from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigatation = useNavigation()

    useEffect(() =>{
       setTimeout(() =>{
            navigatation.navigate("Delivery")
       }, 4000);
    }, []);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/cooking-min.gif")}
        // source={require("../assets/deliver.gif")}
        // iterationCount={1}
        className='h-96 w-96'
      />

      <Animatable.Text
      animation={"slideInUp"}
      iterationCount={1}
      className='text-white text-lg my-10 text-center'
      >
        Waiting for the Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color='white'/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen