import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '../assets';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from '../config/firebase.config';

const Homescreen = () => {
    const user = useSelector((state)=>state.user.user);
    const [isLoading, setIsLoading] = useState(true );
    const navigation =useNavigation();
    const[chats,setChats]=useState(null);

    useLayoutEffect(()=>{
      const chatQuery = query(
        collection(firestoreDB,"chats"),
        orderBy("_id","desc")
      );
      const unsubcribe = onSnapshot(chatQuery,(querySnapShot)=>{
        const chatRooms = querySnapShot.docs.map((doc)=>doc.data());
        setChats(chatRooms);
        setIsLoading(false) 
      });
      return unsubcribe
    },[]);

  return (
    <View className='flex-1 '>
      <SafeAreaView>
       
        <View className='flex-row item-center justify-between px-4 py-2'>
          <Image
          source={Logo}
          className="w-12 h-12"/>
        <TouchableOpacity className='w-12 h-12 rounded-full border border-green-400 item-center justify-center'
        onPress={()=>navigation.navigate("ProfileScreen")}>
          <Image
            source={{uri:user?.profilePic}}
            className='w-full h-full'/>
        </TouchableOpacity>        
        </View>
       
        <ScrollView className='w-full px-3  '>
          <View className="w-full flex-row items-center justify-between px-2 py-2">
          <Text className="font-extrabold text-gray-600 ">Messages</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("AddToChat")}>
          <Ionicons name="chatbox" size={24} color={"gray"}/>
          </TouchableOpacity>
          </View>

          {isLoading ? 
          (<>
            <View className="items-center justify-center">
            <ActivityIndicator size={"large"} color={"#43C651"}/>
            </View>
          </>) : (<>
            {chats&&chats?.length>0 ? <>
              {chats?.map(room=>(
                <MessageCard key={room._id} room={room}/>
              ))
              }
            </>:<></>}
          </>)}

        </ScrollView>
      </SafeAreaView>
      
    </View>
  )
}
 
const MessageCard =({room})=>{
  const navigation =useNavigation();
  return(
    <TouchableOpacity 
      onPress={()=>navigation.navigate("ChatScreen",{room:room})}
      className="w-full flex-row items-center justify-start py-2">
      <View className="w-14 h-14 border-2 flex border-green-400 rounded-full items-center justify-center">
      <FontAwesome5 name="users" size={24} color="gray"/>
      </View>
      <View className="flex-1 w-full px-4 items-start justify-center">
      <Text className="font-semibold capitalize">{room.chatName}</Text>
      <Text className="text-gray-500">This is a sample message</Text>
      </View>
      <Text className="font-semibold px-4 text-green-400">16 Min</Text>

    </TouchableOpacity>
  )
}


export default Homescreen