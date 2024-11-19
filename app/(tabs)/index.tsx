import { HelloWave } from "@/components/HelloWave";
import { View, Text, Pressable } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from "expo-router";


export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-600 pt-16 pb-6 px-6">
        <Animated.View className={"flex-row justify-between items-center "} >
          <View>
            <View className={"flex-row gap-2  items-end"}>
              <Text className="text-white  text-lg" style={{ fontFamily: 'BarlowMedium' }}  >
                Good Morning
              </Text>
              <HelloWave />
            </View>
            <Text className="text-white text-2xl " style={{ fontFamily: 'BarlowBold' }}>Haytham Hany</Text>
          </View>
          <MaterialCommunityIcons name="bell-badge-outline" size={27} color="white"></MaterialCommunityIcons>
        </Animated.View>
        <Pressable onPress={() => { router.push('/explore') }}>
          <View className="flex-row  items-center mt-4 bg-white/20 rounded-2xl px-4 py-2" >
            <MaterialCommunityIcons name="magnify" size={27} color="white" />
            <Text className="text-white mx-2" style={{ fontFamily: 'BarlowMedium' }}>What are you looking for?</Text>
          </View>
        </Pressable>

      </View>
    </View>
  );
}


