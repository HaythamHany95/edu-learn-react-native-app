import { View, Text, Pressable, Image } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Course } from '@/types/types';
import { useWishListStore } from '@/store/WishListStore';
import { router } from 'expo-router';

interface CourseItemProps {
   course: Course;
   index: number;
   customStyle?: string;
}

const CourseItem = ({ course, index, customStyle }: CourseItemProps) => {
   //---------------- WishListStore "Zustand" --------------
   const { addToWishList, removeFromWishList, isInWishList } = useWishListStore();
   const isWishList = isInWishList(course.id);

   const toggleWishListButton = () => {
      if (isWishList) {
         removeFromWishList(course.id);
      } else {
         addToWishList(course);
      }
   }
   //-----------------------------------------------
   return (
      <Pressable
         onPress={() => { router.push({ pathname: '/course-details', params: { courseId: course.id } }) }}
         className={'pt-4  flex-col ' + (customStyle ? customStyle : '')} >
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

                  <Text className='text-lg' style={{ fontFamily: 'BarlowMedium' }}>{course.is_paid ? `${course.price}` : 'Free'}</Text>
                  <Pressable onPress={toggleWishListButton}><Ionicons name={isWishList ? 'heart' : 'heart-outline'} size={24} color={isWishList ? 'red' : 'gray'} /></Pressable>
               </View>
            </View>

         </Animated.View>
      </Pressable>
   )
}

export default CourseItem