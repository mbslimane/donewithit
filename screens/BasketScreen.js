import { View, Text } from 'react-native'
import React, { useMemo, useState ,useEffect} from 'react'
import { useNavigation} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../feautres/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../feautres/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { urlFor } from '../sanity'
import PreparingOrderScreen from './PreparingOrderScreen'


const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const [groupedItemesInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal)

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems)
    },[items])

    

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-s">
            <View>
                <Text className={'text-lg font-bold text-center'} >Basket</Text>
                <Text className={'text-center text-gray-400'}>{restaurant.title}</Text>
            </View>
            <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-3 right-5 ">
                <Ionicons name='close-circle' color={'#00CCBB'} size={50}  />
            </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
            <Image
            className="h-7 w-7 bg-gray-300 rounded-full"
            source={{
                uri: 'https://links.papareact.com/wru',
                }}
                />
            <Text className="flex-1"> Deliver in 50-75 min</Text>
            <TouchableOpacity>
                <Text className="text-[#00CCBB]">Change</Text>
            </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
            {Object.entries(groupedItemesInBasket).map(([key, items]) => (
                <View 
                key={key}
                className='flex-row items-center space-x-3 px-5 py-2 bg-white'
                >
                    <Text className='text-[#00BBCC]'>{items.length} x</Text>
                    <Image
                        source={{uri:urlFor(items[0]?.image).url()}}
                        className={'h-12 w-12 rounded-full'}
                    />
                    <Text className='flex-1'> {items[0]?.name}</Text>

                    <Text >
                        <Text>{items[0]?.price} DZD</Text>
                    </Text>

                    <TouchableOpacity>
                        <Text className='text-[#00CCBB] text-xs'
                         onPress={() => dispatch(removeFromBasket({id:key}))}
                        >
                            Rremove
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
        <View className='  bottom-1 p-5 mt-5 bg-white space-y-4'>
            <View className='flex-row justify-between '>
                <Text className='text-gray-400'>subtotal</Text>
                <Text className=' text-gray-400 '>{basketTotal} DZD</Text>
            </View>
            <View className='flex-row justify-between '>
                <Text className='text-gray-400'>Delivery Fee</Text>
                <Text className=' text-gray-400 '>200 DZD</Text>
            </View>
            <View className='flex-row justify-between '>
                <Text >Order Total</Text>
                <Text className='font-extrabold '>{basketTotal + 200 } DZD</Text>
            </View>

            <TouchableOpacity  onPress={() => navigation.navigate("PreparingOrderScreen")} className='p-4 bg-[#00CCBB] rounded-lg'>
                <Text className='text-center  text-white font-bold text-lg'
                   
                >
                    Place Order
                </Text>
            </TouchableOpacity>
            
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen