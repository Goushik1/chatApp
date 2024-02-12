import { View, Text, Image ,Dimensions, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'
import { BGImage, Logo } from '../assets';
import { UserInput } from '../components';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { firebaseAuth, firestoreDB } from '../config/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../context/actions/userActions';

const LoginScreen = () => {
    
    const screenWidth=Math.round(Dimensions.get("window").width);
    const [email,setEmail]=useState("");
    const [Password, setPassword] = useState("");
    const [emailValidationStatus, setEmailValidationStatus] = useState(false);
    const navigation = useNavigation();
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const dispatch = useDispatch();

    const handleSignin = async ()=>{
        if(emailValidationStatus && email!== ""){
            await signInWithEmailAndPassword(firebaseAuth,email,Password).then(
                (userCred)=>{
                    if(userCred){
                        console.log("Logged User Id:",userCred.user.uid);
                        getDoc(doc(firestoreDB,"users",userCred.user.uid)).then(
                            (docSnap)=>{
                                if(docSnap.exists()){
                                    console.log("User Data:",docSnap.data());
                                    dispatch(SET_USER(docSnap.data()))
                                }
                            });
                    }

            })
            .catch((err)=>{
                console.log("Error:",err.message);
                if(err.message.includes("wrong-password")){
                    setAlert(true)
                    setAlertMsg('Invalid Password')
                }else if(err.message.includes("user-not-found")){
                    setAlert(true)
                    setAlertMsg('User Not Found')
                }else{
                    setAlert(true)
                    setAlertMsg('Something went wrong:)')
                }
                setInterval(()=>{
                    setAlert(false)
                },2000);
            });
        }
    };

  return (
    <View className="flex-1 items-center justify-start">
        <Image 
            source={BGImage} 
            className='h-96' 
            style={{width:screenWidth}} 
            resizeMode='cover'/>
        <View 
            className='w-full h-full bg-white rounded-tl-[90px] items-center justify-start py-6 px-6 space-y-6 -mt-44'>
            
            {/*logo*/}
            <Image 
                source={Logo} 
                className='w-14 h-14' 
                resizeMode='contain'/>
            <Text 
                className='text-l font-semibold'>
                Welcome back!
            </Text>

            {/*loginInfo*/}
            <View className='w-full items-center justify-center'>

                {alert && <Text className='text-red-500'>{alertMsg}</Text>}
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
                    onPress={handleSignin}
                    className='w-full rounded-2xl bg-green-400 font-semibold px-4 py-3 items-center justify-center my-3'>
                    <Text 
                        className=' text-white text-xl'>
                        Sign in
                    </Text>
                </TouchableOpacity>
                
                <View className='w-full py-7 flex-row items-center justify-center space-x-2'>
                    <Text>
                        Don't have an acoount?
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("SignUpScreen")} >
                    <Text 
                        className='font-semibold text-green-500'>
                        Create here
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default LoginScreen;