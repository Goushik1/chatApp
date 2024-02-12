import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import { firebaseAuth } from '../config/firebase.config'
import { SET_USER_NULL } from '../context/actions/userActions'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch =useDispatch();
  const user = useSelector((state)=>state.user.user);
  const handleLogOut = async()=>{
    await (firebaseAuth.signOut()).then(()=>{
      dispatch(SET_USER_NULL())
      navigation.replace("LoginScreen") 
    })
  }
  return (
    <SafeAreaView>
      <View className="w-full flex-row items-center justify-between px-4 py-12">
                
                {/*back icon*/}
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <MaterialIcons name='chevron-left' size={32} color={"black"}/> 
                </TouchableOpacity>
                <TouchableOpacity>
                <Entypo name="dots-three-vertical" size={24} color={"black"}/>
                </TouchableOpacity> 
      </View>      
             <View className="items-center justify-center -mt-10">
                <View className="relative rounded-full border-2 border-green-400">
                  <Image source={{uri:user?.profilePic}}
                  className="w-24 h-24"
                  resizeMode='contain'/>
                </View>
                <Text className="text-green-600 font-semibold">{user?.fullName}</Text>
                <Text>{user?.providerData?.email}</Text>
             </View>
        <View className="w-full flex-row items-center justify-center space-x-8 py-6">
          <View className="item-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <MaterialIcons name='messenger-outline' size={24} color={"gray"}/>
            </TouchableOpacity>
            <Text className="py-1">Message</Text>
          </View>

          <View className="item-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <Ionicons name='ios-videocam-outline' size={24} color={"gray"}/>
            </TouchableOpacity>
            <Text  className="px-1 py-1">Video</Text>
          </View>

          <View className="item-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <Ionicons name='call-outline' size={24} color={"gray"}/>
            </TouchableOpacity>
            <Text  className="px-3 py-1">Call</Text>
          </View>

          <View className="item-center justify-center">
            <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <Entypo name='dots-three-horizontal' size={24} color={"gray"}/>
            </TouchableOpacity>
            <Text className="px-1 py-1 items-center justify-center flex-1">Menu</Text>
          </View>

        </View>
      <View className="w-full items-center justify-between flex-row px-4 space-x-3">
          
            <Text className="font-semibold">Media shared</Text>
            <Text className="font-semibold uppercase">View all</Text>
          </View>
            <View className="w-full item-center justify-between flex-row py-3 px-5">
              <TouchableOpacity className="w-24 h-24 rounded-xl bg-gray-300 overflow-hidden">
              <Image
              source={{uri:"https://picsum.photos/200"}}
              className="w-full h-full" resizeMode='cover'/>
              </TouchableOpacity>
             
              <TouchableOpacity className="w-24 h-24 rounded-xl bg-gray-300 overflow-hidden">
              <Image
              source={{uri:"https://picsum.photos/200"}}
              className="w-full h-full" resizeMode='cover'/>
              </TouchableOpacity>

              <TouchableOpacity className="w-24 h-24 rounded-xl bg-gray-300 overflow-hidden">
              <Image
              source={{uri:"https://picsum.photos/200"}}
              className="w-full h-full" resizeMode='cover'/>
              <View className="absolute w-full h-full items-center justify-center bg-[#00000068]">
                <Text className="text-white">150+</Text>
              </View>
              </TouchableOpacity>     
      </View>
      <View className="w-full flex-row items-center justify-between px-6 py-4 ">
                <View className="items-center flex-row ">
                  <MaterialIcons name='security' size={24}/>
                  <Text className="px-2">Privacy</Text>
                </View>
                <MaterialIcons name='chevron-right' size={24} color={"gray"}/>
              </View>

              <View className="w-full flex-row items-center justify-between px-6 py-4 ">
                <View className="items-center flex-row ">
                  <MaterialIcons name='message' size={24}/>
                  <Text className="px-2">Groups</Text>
                </View>
                <MaterialIcons name='chevron-right' size={24} color={"gray"}/>
              </View>

              <View className="w-full flex-row items-center justify-between px-6 py-4 ">
                <View className="items-center flex-row ">
                  <MaterialIcons name='music-note' size={24}/>
                  <Text className="px-2">Media's & Downloads</Text>
                </View>
                <MaterialIcons name='chevron-right' size={24} color={"gray"}/>
              </View>

              <View className="w-full flex-row items-center justify-between px-6 py-4 ">
                <View className="items-center flex-row ">
                  <MaterialIcons name='person' size={24}/>
                  <Text className="px-2">Account</Text>
                </View>
                <MaterialIcons name='chevron-right' size={24} color={"gray"}/>
              </View>

              <TouchableOpacity onPress={handleLogOut} className="items-center justify-center py-3">
                <Text className="font-semibold text-green-600 text-lg">Logout</Text>
              </TouchableOpacity>

    </SafeAreaView>
  )
}

export default ProfileScreen