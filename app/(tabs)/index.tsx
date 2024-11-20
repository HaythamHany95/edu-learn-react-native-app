import { HelloWave } from "@/components/HelloWave";
import { View, Text, Pressable, ScrollView, ActivityIndicator, FlatList } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { password, username } from "@/utils/api-keys";
import { useQuery } from "@tanstack/react-query";

import CourseItem from "@/components/CourseItem";

interface Category {
  id: string;
  name: string;
  icon: string;
}
interface SearchResponse {
  results: Course[]
}
interface Course {
  id: number;
  title: string;
  subtitle: string;
  image_480x270: string;
  is_paid: boolean;
  price: string;
  num_reviews: number;
}


const categories: Category[] = [
  {
    id: 'business',
    name: 'Business',
    icon: 'briefcase'
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: 'hardware-chip'
  },
  {
    id: 'design',
    name: 'Design',
    icon: 'color-palette'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: 'megaphone'
  },
  {
    id: 'health',
    name: 'Health',
    icon: 'fitness'
  },
  {
    id: 'music',
    name: 'Music',
    icon: 'musical-notes'
  },
  {
    id: 'lifeStyle',
    name: 'LifeStyle',
    icon: 'heart'
  }
];

const fetchCourses = async (searchQuery: string): Promise<SearchResponse> => {
  const response = await axios.get(`https://www.udemy.com/api-2.0/courses/`,
    {
      params: {
        search: searchQuery
      },
      auth: {
        username: username,
        password: password
      }
    }
  );
  return response.data


}

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('business');
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['searchQuery', selectedCategory],
    queryFn: () => fetchCourses(selectedCategory),
    enabled: true
  })
  console.log(data)

  const renderCategory = (category: Category) => (
    <Pressable
      key={category.id}
      onPress={() => setSelectedCategory(category.id)}
      className="flex-col items-center rounded-full mr-4 mt-2 gap-2 p-2 "
    >
      <View key={category.id} className={`flex-row items-center rounded-full p-4 ${selectedCategory === category.id ? 'border-2 border-blue-600' : 'border-2 border-gray-200'}`} >
        <Ionicons name={category.icon as any} size={24} color={selectedCategory === category.id ? 'blue' : 'gray'} />
      </View>
      <Text className={`${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`} style={{ fontFamily: selectedCategory === category.id ? 'BarlowBold' : 'BarlowMedium' }}>{category.name}</Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-600 pt-16 pb-6 px-6">
        <Animated.View className={"flex-row justify-between items-center "} >
          <View>
            <View className={"flex-row gap-2 items-end"}>
              <Text className="text-white text-lg" style={{ fontFamily: 'BarlowMedium' }} >
                Good Morning
              </Text>
              <HelloWave />
            </View>
            <Text className="text-white text-2xl " style={{ fontFamily: 'BarlowBold' }}>Haytham Hany</Text>
          </View>
          <MaterialCommunityIcons name="bell-badge-outline" size={27} color="white"></MaterialCommunityIcons>
        </Animated.View>
        <Pressable onPress={() => { router.push('/explore') }}>
          <View className="flex-row items-center mt-4 bg-white/20 rounded-2xl px-4 py-2" >
            <MaterialCommunityIcons name="magnify" size={27} color="white" />
            <Text className="text-white mx-2" style={{ fontFamily: 'BarlowMedium' }}>What are you looking for?</Text>
          </View>
        </Pressable>
      </View>
      <ScrollView>
        <View className="flex-row bg-white px-5 py-2 justify-between items-center">
          <Text className="text-xl" style={{ fontFamily: 'BarlowBold' }}>Explore Topics</Text>
          <Text className="text-blue-600" style={{ fontFamily: 'BarlowBold' }}>See More</Text>
        </View>
        <Animated.View entering={FadeInDown.duration(300).delay(300).springify()}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
            {categories.map((category) => renderCategory(category))}
          </ScrollView>
        </Animated.View>


        {
          //* IF WE ARE LOADING ⌛
          isLoading ? (
            <View className="flex-1 items-center justify-center mt-10">
              <ActivityIndicator color="blue" size="large" />
            </View>

            //* IF THERE IS AN ERROR ❌
          ) : error ? (
            <View>
              <Text> Error: {(error as Error).message}</Text>
            </View>


            //*  IF WE HAVE DATA ✅🔋
          ) : data?.results ? (
            <FlatList
              className="flex-row  gap-5 "
              horizontal={true}
              data={data.results}
              renderItem={({ item }) => (
                <CourseItem
                  index={item.id}
                  course={item}
                  customStyle="w-[22rem] pl-6 mt-10"
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false} />


          ) :
            // IF THERE IS NO DATA 🪫
            (
              <View className="flex-1 items-center justify-center">
                <Text>No results found</Text>
              </View>
            )
        }


      </ScrollView>
    </View>
  );
}