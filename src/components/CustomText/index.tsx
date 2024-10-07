import { View, Text, useColorScheme, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { colors } from '../../theme/colors';

interface CustomTextProps { 
    style?: StyleProp<TextStyle>;
}

const CustomText: React.FunctionComponent<React.PropsWithChildren<CustomTextProps>> = ({ children, style }) => {
    const colorScheme = useColorScheme();
    return (
        <Text style={[{ color: colorScheme === "dark" ? colors.white : colors.black }, style]}>{children}</Text>
    )
}

export default CustomText