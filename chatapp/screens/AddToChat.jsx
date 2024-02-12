import { View, Text, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {setDoc,doc} from "firebase/firestore";
import { firestoreDB } from '../config/firebase.config'

const AddToChat = () => {
    const user =useSelector((state)=>state.user.user);
    const navigation = useNavigation();
    const [addToChat, setAddToChat] = useState("");

    const createNewChat = async() =>{
      let id = `${Date.now()}`

      const _doc ={
        _id : id,
        user : user,
        chatName : addToChat
      }
      if(addToChat !==""){
        setDoc(doc(firestoreDB,"chats",id),_doc).then(()=>{
          setAddToChat("");
          navigation.navigate("HomeScreen");
        }).catch((err)=>{
          alert(err);
        })
      }
    }

  return (
    <View className="flex-1">
        <View className="w-full bg-green-600 flex-[0.25] px-2 py-8">
            <View className="flex-row items-center justify-between px-2 py-3">
                
                {/*back icon*/}
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <MaterialIcons name='chevron-left' size={32} color={"white"}/> 
                </TouchableOpacity>
               
                {/*profilePic*/}
                <Image source={{uri:user?.profilePic}}
                className="w-12 h-12"
                resizeMode='contain'/>
                
            </View>
        </View>
        <View className="w-full bg-white px-4 py-6 rounded-t-[50px] flex-1 -mt-10 ">
            <View className="w-full px-4 py-4">
            <View className="w-full px-4 flex-row items-center justify-between py-4 border rounded-xl border-gray-200 space-x-3">
                {/*chat icon*/}
                <Ionicons 
                  name='chatbubbles' 
                  size={18} 
                  color={'gray'}/>
                {/*textinnput*/}
                <TextInput
                  placeholder='Search or Create a chat'
                  value={addToChat}
                  onChangeText={(text)=>setAddToChat(text)}
                  className="flex-1 text-gray-900 "/>
                {/*sent icon*/}
                <TouchableOpacity onPress={createNewChat}>
                  <FontAwesome name="send" size={18} color={"gray"}/>
                </TouchableOpacity>
             
             </View>
            </View>
        </View>
    </View>
  )
}

export default AddToChat