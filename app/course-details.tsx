import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import { password, username } from '@/utils/api-keys';
import { Course } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const fetchCourseById = async (courseId: string): Promise<Course> => {
   const response = await axios.get(`https://www.udemy.com/api-2.0/courses/${courseId}`, {
      auth: {
         username: username,
         password: password
      }
   });
   return response.data

}

const CourseDetails = () => {

   const navigationParams = useLocalSearchParams<{ courseId: string }>();

   const { data: courseSuccess, error: courseError, isLoading: courseLoading, refetch } = useQuery({
      queryKey: ['course_by_id', navigationParams.courseId],
      queryFn: () => fetchCourseById(navigationParams.courseId ?? ''),
      enabled: true
   })

   return (
      <ParallaxScrollView
         headerBackgroundColor={{
            dark: '#353636',
            light: '#D0D0D0',
         }}
         headerImage={
            <Image source={{ uri: courseSuccess?.image_480x270 }}
               resizeMode='stretch'
               className=" w-full h-72 rounded-lg"
            />}
      >
         <View >
            <View className='bg-blue-700 p-1 mb-5 w-32 justify-center items-center rounded-xl' >
               <Text className='color-white text-base' style={{ fontFamily: 'BarlowMedium' }}>{courseSuccess?.locale?.title}</Text>

            </View>
            <Text className='text-2xl' style={{ fontFamily: 'BarlowBold' }}>{courseSuccess?.title}</Text>
            <Text className='text-base mt-2 color-gray-600' style={{ fontFamily: 'BarlowMedium' }}>{courseSuccess?.visible_instructors[0].display_name}</Text>
            <Text className='text-3xl mt-6 ' style={{ fontFamily: 'BarlowBold' }}>{
               courseSuccess?.price
            }</Text>

         </View>
      </ParallaxScrollView>

   )
}

export default CourseDetails