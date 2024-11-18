import { HelloWave } from "@/components/HelloWave";
import { View, Text } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated'


export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-600 pt-16 pb-6 px-6">
        <Animated.View className={"flex-row justify-between items-center "} >
          <View>
            {/* Good Morning with Wave 👋 */}
            <View>
              <View className={"flex-row gap-2  items-end"}>
                <Text className="text-white  text-lg" style={{ fontFamily: 'BarlowMedium' }}  >
                  Good Morning
                </Text>
                <HelloWave />
              </View>

            </View>






          </View>



        </Animated.View>

      </View>
    </View>
  );
}


