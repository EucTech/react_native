import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyBoardType?: string;
  props?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View 
      className={`border-2 rounded-2xl flex-row w-full h-16 px-4 bg-black-100 items-center ${focus ? "border-secondary" : "border-black-200" }`} >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"/>

          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
