import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TextInput } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const UserInput = ({placeHolder,isPass,setStateValue,setEmailValidationStatus}) => {
    
    const [value, setValue] = useState("");
    const handleText = (text)=>{
        setValue(text);
        setStateValue(text);
        if (placeHolder ==='Email'){
          const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const status = emailRegex.test(value);
          setEmailValid(status);
          setEmailValidationStatus(status);
        }

    };
    const [icons, setIcons] = useState(null);
    const [showPass, setShowPass] = useState(true)
    const [emailValid, setEmailValid] = useState(false)
    useLayoutEffect(()=>{
        switch(placeHolder){
            case 'Full Name':
              return setIcons("person")
            case 'Email':
                return setIcons("email")
            case 'Password':
                return setIcons("lock")
        }
    },[]);

  return (
    <View 
      className={`border rounded-2xl px-4 py-5 flex-row items-center justify-between space-x-4 my-2 
      ${!emailValid && placeHolder === 'Email' && value.length > 0 ? 'border-red-500' : 'border-gray-200'}`}>
      <MaterialIcons name={icons} size={24} />
        <TextInput 
          className='flex-1 font-semibold -mt-1'
          placeholder={placeHolder}
          value={value}
          onChangeText={handleText}
          autoCapitalize='none'
          secureTextEntry={isPass && showPass}/>

      {isPass && 
        (<TouchableOpacity 
          onPress={()=>setShowPass(!showPass)}>
          <Entypo 
            name={`${showPass ? 'eye' : 'eye-with-line'}`} 
            size={24}/>
        </TouchableOpacity>)}
    </View>
  )
}

export default UserInput;