import { HelloWave } from "@/components/HelloWave";
import { View, Text, Pressable, ScrollView } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  icon: string;
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

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('business');

  const renderCategory = (category: Category) => (
    <Pressable
      key={category.id}
      onPress={() => setSelectedCategory(category.id)}
      className="flex-col items-center rounded-full mr-4 gap-4"
    >
      <View key={category.id} className={`flex-row items-center rounded-full p-4 ${selectedCategory === category.id ? 'border border-blue-600' : 'border-2 border-gray-200'}`} >
        <Ionicons name={category.icon as any} size={24} color={selectedCategory === category.id ? 'blue' : 'gray'} />
      </View>
      <Text className={`${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`}>{category.name}</Text>
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
      </ScrollView>
    </View>
  );
}