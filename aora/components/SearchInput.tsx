import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

interface SearchInputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyBoardType?: string;
  props?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
  

      <View 
      className={`border-2 rounded-2xl flex-row w-full h-16 px-4 bg-black-100 items-center space-x-4 ${focus ? "border-secondary" : "border-black-200" }`} >
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        //   secureTextEntry={title === "Password" && !showPassword}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
        />
        
        <TouchableOpacity>
            <Image source={icons.search} 
            className="w-5 h-5"
            resizeMode="contain"
            />
            
        </TouchableOpacity>
      </View>

  );
};

export default SearchInput;
