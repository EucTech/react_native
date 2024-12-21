import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

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
      className={`border-2 rounded-2xl  w-full h-16 px-4 bg-black-100 items-center ${focus ? "border-secondary" : "border-black-200" }`} >
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
      </View>
    </View>
  );
};

export default FormField;
