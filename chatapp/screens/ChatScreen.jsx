import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, ScrollView, Platform } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore';
import { firestoreDB } from '../config/firebase.config'


const ChatScreen = ({route}) => {
    const {room} = route.params;
    const user = useSelector((state)=>state.user.user);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(null);


    const sendMessage = async ()=>{
        const timeStamp = serverTimestamp();
        let id = `${Date.now()}`;
        const _doc ={
            _id : id,
            roomId : room._id,
            timeStamp : timeStamp,
            message : message,
            user : user,
        }
        setMessage("")
        await addDoc(collection(doc(firestoreDB,"chats",room._id),"messages"),_doc).then(()=>{}).catch((err)=>{alert(err)})
    };

    useLayoutEffect(()=>{
       const chatQuery = query(
            collection(firestoreDB,"chats",room?._id,"messages"),
            orderBy("timeStamp","asc"));
        const unsubcribe = onSnapshot(chatQuery,(query)=>{
            const updatedMessage =query.docs.map(doc=>doc.data())
            setMessages(updatedMessage)
            setIsLoading(false)
        })
        return unsubcribe;
    },[])

  return (
    <View className="flex-1">
    <View className="w-full bg-green-600 flex-[0.25] px-2 py-8 ">
        <View className="flex-row items-center justify-between w-full px-2 py-4">
            {/*back icon*/}
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialIcons name='chevron-left' size={32} color={"white"}/> 
            </TouchableOpacity>
            <View className="flex-row items-center justify-center mr-20 space-x-3">
            <View className="w-12 justify-center">
            <FontAwesome5 name='users' color={"white"} size={24}/>
            
            </View>
            
            <View className="items-center justify-center">
            <Text className="text-gray-100 ">{room.chatName}</Text>
            <Text className="text-gray-100 ">online</Text>
            </View>
            </View>
            
            <View className="flex-row items-center justify-center space-x-3">
                <FontAwesome name="phone" size={24} color={"white"}/>
                <FontAwesome5 name="video" size={24} color={"white"}/>
                <Entypo name="dots-three-vertical" size={24} color={"white"}/>
            </View>
            </View>

        
        </View>
        <View className="w-full flex-1 bg-white rounded-t-[50px] px-4 space-x-4 py-2 -mt-10 ">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios"? "padding":"height"}
            keyboardVerticalOffset={160}>
                <>
                <ScrollView>
                {isLoading ? 
                (<>
                    <View className="items-center justify-center">
                    <ActivityIndicator size={"large"} color={"#43C651"}/>
                    </View>
                </>):<>

                {messages?.map((msg)=>msg?.user.providerData?.email === user.providerData.email ? <>
                <View key={msg._id} className="m-1">
                    <View className="rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-green-600 space-x-2 px-2 py-2 "
                    style={{alignSelf:"flex-end"}}>
                       <Text className="text-white"> {msg.message} </Text>
                    </View>
                    <View style={{alignSelf:"flex-end"}} >
                        {msg?.timeStamp?.seconds && (
                           <Text className="text-black">
                            {new Date(parseInt(msg?.timeStamp?.seconds)*1000).toLocaleTimeString("en-US",{
                                hour:"numeric",
                                minute:"numeric",
                                hour12: true,
                            })}
                           </Text> 
                            )}
                    </View>

                </View>

                
                </> : <>
                <View key={msg._id} className="m-1" style={{alignItems:"flex-start"}}>
                <View className="items-center justify-center flex-row py-1 space-x-2">    
                    <View>
                        <Image source={{uri:msg?.user?.profilePic}} className="w-10 h-10 rounded-full"/>
                    </View>
                <View className="rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-gray-300 space-x-2 px-2 py-2"
                    style={{alignSelf:"flex-start"}}>
                       <Text className="text-black"> {msg.message} </Text>
                    </View>
                    <View style={{alignSelf:"flex-start"}}>
                        {msg?.timeStamp?.seconds && (
                           <Text className="text-black">
                            {new Date(parseInt(msg?.timeStamp?.seconds)*1000).toLocaleTimeString("en-US",{
                                hour:"numeric",
                                minute:"numeric",
                                hour12: true,
                            })}
                           </Text> 
                            )}
                    </View>
                </View>
                </View>
                
                </>)}

                </>}
                </ScrollView>
                
                    <View className="w-full flex-row item-center justify-center py-3 space-x-2">
                        <View className=" bg-gray-100 rounded-2xl item-center py-1 flex-1 flex-row px-2">
                            <TouchableOpacity className="mt-1">
                            <Entypo name='emoji-happy' size={24} color={"gray"}/>
                            </TouchableOpacity>
                            <TextInput
                            className="flex-1 font-semibold px-2 h-8"
                            placeholder='Type here..'
                            value-={message}
                            onChangeText={(text)=>setMessage(text)}/>
                             <TouchableOpacity className="mt-1">
                            <Entypo name='mic' size={24} color={"gray"}/>
                            </TouchableOpacity>
                        </View>
                    
                    <View className="pl-4 px-2 py-2" >
                        <TouchableOpacity onPress={sendMessage}>
                        <FontAwesome name='send' size={24} color={"gray"}/>
                        </TouchableOpacity>
                    </View>
                    </View>
               
                </>
            </KeyboardAvoidingView>

        </View>

    </View>
  )
}

export default ChatScreen