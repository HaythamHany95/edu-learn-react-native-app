import { View, Text, Pressable, Image } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface CourseItemProps {
   course: any;
   index: number;
   customStyle?: string;
}

const CourseItem = ({ course, index, customStyle }: CourseItemProps) => {
   return (
      <Pressable className={'pt-4  flex-col ' + (customStyle ? customStyle : '')} >
         <Animated.View className={' gap-2 w-full border border-gray-200 rounded-2xl overflow-hidden'}
            entering={FadeInDown.delay(100).duration(index * 300).springify()}
         >
            <View >
               <Image
                  resizeMode='stretch'
                  source={{ uri: course.image_480x270 }}
                  className=" w-full h-40 "
               />
            </View>
            <View className='flex-col p-2 h-28'>
               <Text className='text-lg' style={{ fontFamily: 'BarlowBold' }}>{course.title}</Text>
               <View className='flex-row pt-2 items-center justify-between' >

                  <Text style={{ fontFamily: 'BarlowMedium' }}>{course.is_paid ? `${course.price}` : 'Free'}</Text>
                  <Ionicons name="heart-outline" size={20} color="red" />
               </View>
            </View>

         </Animated.View>
      </Pressable>
   )
}

export default CourseItem