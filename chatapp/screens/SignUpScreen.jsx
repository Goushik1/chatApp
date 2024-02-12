import { View, Text, Image ,Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState } from 'react'
import { BGImage, Logo } from '../assets';
import { UserInput } from '../components';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { avatars } from '../utils/supports';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {firebaseAuth,firestoreDB} from '../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen = () => {

    const screenWidth=Math.round(Dimensions.get("window").width);
    const screenHeight=Math.round(Dimensions.get("window").height);
    
    const [email,setEmail]=useState("");
    const [Password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isAvatarMenu, setIsAvatarMenu] = useState(false);
    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url); 
    const [emailValidationStatus, setEmailValidationStatus] = useState(false)
 
    const navigation =useNavigation();
    
    const handleAvatar=(item)=>{
        setAvatar(item.image.asset.url)
        setIsAvatarMenu(false)
    }

    const handleSignUp = async ()=>{
    if (emailValidationStatus && email !== ''){
        await createUserWithEmailAndPassword(firebaseAuth,email,Password).then((userCred)=>{
            console.log("User Id:",userCred.user.uid);
            const data ={
                _id: userCred.user.uid,
                fullName: name,
                profilePic: avatar,
                providerData: userCred.user.providerData[0],
            }
            setDoc(doc(firestoreDB,"users",userCred.user.uid),data).then(()=>{
                navigation.navigate("LoginScreen");
            })
        })
    }
    }
  return (
    <View className="flex-1 items-center justify-start">
        
    <Image source={BGImage} className='h-96' style={{width:screenWidth}} resizeMode='cover'/>

        {/*avatar*/}
     {isAvatarMenu && (
        <>
        <View 
            className='absolute inset-0 z-10'
            style={{width:screenWidth,height:screenHeight}}>
        <ScrollView>        
            <BlurView 
                
                className='px-3 py-16 flex-row flex-wrap items-center justify-evenly'
                tint="light"
                insensity={40} 
                >
 
        {avatars?.map((item)=>(
            <TouchableOpacity onPress={( )=>handleAvatar(item)}
                 className='w-20 m-3 h-20 p-1 rounded-full border-2 border-green-400' 
                 key={item._id}>
                <Image
                    source={{
                        uri:item?.image.asset.url,
                    }}
                    className='w-full h-full'
                resizeMode='contain'/>
            </TouchableOpacity>
        ))}

            </BlurView>
        </ScrollView>
        </View>
        </>
     )}

    <View className='w-full h-full bg-white rounded-tl-[90px] items-center justify-start py-6 px-6 space-y-6 -mt-44'>
        
        {/*logo*/}
        <Image 
            source={Logo} 
            className='w-14 h-14' 
            resizeMode='contain'/>
        <Text 
            className='text-l font-semibold'>
            Join with us!
        </Text>

    <View>
        <TouchableOpacity 
            onPress={()=>setIsAvatarMenu(true)}
            className='w-20 h-20 rounded-full border-2 border-green-400 p-1'>
            <Image 
                source={{uri:avatar,}}
                className='w-full h-full ' 
                resizeMode='contain'/>
        
                <View 
                    className='w-6 h-6 rounded-full bg-green-400 absolute top-0 right-0 items-center justify-center'>
                        <MaterialIcons 
                        name='edit' 
                        size={18} 
                        color={'white'}/>
                </View>
        </TouchableOpacity>
    </View>

        {/*loginInfo*/}
        <View className='w-full items-center justify-center'>
            <UserInput 
                placeHolder={"Full Name"}  
                isPass={false}
                setStateValue={setName}/>

            <UserInput 
                placeHolder={"Email"}  
                isPass={false}
                setStateValue={setEmail}
                setEmailValidationStatus={setEmailValidationStatus}/>

            <UserInput 
                placeHolder={"Password"} 
                isPass={true}
                setStateValue={setPassword}/>
            
            <TouchableOpacity 
                onPress={handleSignUp}
                className='w-full rounded-2xl bg-green-400 font-semibold px-4 py-3 items-center justify-center my-3'>
                <Text 
                    className=' text-white text-xl'>
                    Sign Up
                </Text>
            </TouchableOpacity>
                <View className='w-full py-7 flex-row items-center justify-center space-x-2'>
                    <Text>
                        Have an acoount?
                    </Text>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("LoginScreen")} >
                        <Text 
                            className='font-semibold text-green-500'>
                            Login here
                        </Text>
                    </TouchableOpacity>
                </View>
        </View>
    </View>
</View>
  )
}

export default SignUpScreen