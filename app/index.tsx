import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Button from '@/components/Button'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native';

const Welcome = () => {
   const animation = useRef<LottieView>(null)
   return (

      <View className='flex-1 items-center justify-center w-full gap-4 p-4 bg-white'>

         {/* Lottie Animation */}
         <Animated.View
            className={'w-full px-10'}
            entering={FadeInDown.duration(300).springify()}
         >
            <LottieView
               ref={animation}
               source={require('../assets/animations/lottie.json')} autoPlay loop style={{ height: 300, width: 300 }} />
         </Animated.View>
         {/* Big Text */}
         <Animated.View
            entering={FadeInDown.duration(300).delay(300).springify()}
         >
            <View className='w-full'>
               <Text className='text-5xl text-center leading-relaxed' style={{ fontFamily: 'BarlowExtraBold' }}>Discover and improve your skills </Text>
            </View>

         </Animated.View>
         {/* Small Text */}
         <Animated.View
            entering={FadeInDown.duration(500).delay(500).springify()}
         >
            <View className='w-full'>
               <Text className='text-xl text-center leading-relaxed' style={{ fontFamily: 'BarlowSemiBold' }}>Learn from the best courses and tutorials 🚀 </Text>
            </View>

         </Animated.View>

         {/* Button */}
         <Animated.View
            className={'w-full items-center justify-center mt-8'}
            entering={FadeInDown.duration(700).delay(700).springify()}
         >
            <Button title='Get Started' onPress={() => {
               router.push('/(tabs)')

            }} />

         </Animated.View>
      </View>

   )
}

export default Welcome