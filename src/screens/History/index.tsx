import { View, Text, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../theme/colors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CustomText from '../../components/CustomText';
import { CalculatorData, clearCalculations, UnitConversionData } from '../../features/calculator';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDialog from '../../components/CustomDialog';

const isCalculatorData = (data: CalculatorData | UnitConversionData): data is CalculatorData => {
    return (data as CalculatorData) !== undefined;
};

const History = () => {
    const colorScheme = useColorScheme();
    const history = useAppSelector((state) => state.calculator.history);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => setDialogVisible(true)}>
                    <Icon name="broom" size={28} color={colorScheme === "dark" ? colors.white : colors.black} />
                </TouchableOpacity>
            )
        })
    }, [colorScheme]);
    const clearHistory = () => {
        dispatch(clearCalculations());
        setDialogVisible(false);
    }
    return (
        <View style={{ backgroundColor: colorScheme === 'dark' ? colors.black : colors.white, flex: 1 }}>
            {history.map((his, index) => (
                <View style={{ backgroundColor: colors.grey, margin: 10, padding: 10, borderRadius: 10 }} key={index}>
                    {his.type === 'calculation' && isCalculatorData(his.data) && (
                        <View>
                            <ScrollView horizontal>
                                <CustomText style={{ color: colors.white, fontSize: 21 }}>Input: {his.data.input}</CustomText>
                            </ScrollView>
                            <CustomText style={{ color: colors.white, fontSize: 18 }}>Output: {his.data.output}</CustomText>
                        </View>
                    )}
                </View>
            ))}
            <CustomDialog
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                title="Confirmation"
                description="Are you sure you want to proceed?"
                onOk={clearHistory}
                cancelText="Cancel"
                okText="OK"
            />
        </View>
    )
}

export default History;