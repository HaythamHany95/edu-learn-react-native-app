import { Text, Pressable } from 'react-native'
import React from 'react'

interface ButtonProps {
   title: string;
   onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }: ButtonProps) => {
   return (
      <Pressable onPress={onPress} className='bg-blue-600  py-5 w-3/4 rounded-3xl items-center  justify-center '>
         <Text className='text-white font-bold text-lg' >{title}</Text>
      </Pressable>
   )
}

export default Button