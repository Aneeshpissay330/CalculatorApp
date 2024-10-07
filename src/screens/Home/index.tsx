import { View, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../theme/colors';
import CustomText from '../../components/CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { buttons, operatorMap, calculate, handleInput, handleOperatorAfterResult } from '../../utils';
import { useAppDispatch } from '../../app/hooks';
import { addCalculation } from '../../features/calculator';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  History: undefined;
};

const Home: React.FC = () => {
  const colorScheme = useColorScheme();
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null); // Ref for ScrollView
  const dispatch = useAppDispatch();
  const renderButtonContent = (item: string) => {
    const iconNames = ['backspace', 'division', 'multiplication', 'minus', 'plus', 'equal'];

    if (iconNames.includes(item)) {
      return <Icon name={item} size={30} color="#fff" />;
    }
    return <CustomText style={{ fontSize: 28, color: colors.white }}>{item}</CustomText>;
  };

  const handleClear = () => {
    setInputArray([]);
    setResult('');
  };

  const handleBackspace = () => {
    setInputArray(inputArray.slice(0, -1));
  };

  const handleEqualPress = () => {
    dispatch(addCalculation({ input: inputArray.join(''), output: result }));
    const finalResult = calculate(inputArray, result);
    setResult(finalResult);
    setInputArray([]);
  };

  const handlePress = (value: string) => {
    const { inputArray: newArray, result: newResult } = handleInput(inputArray, value, result);
    setInputArray(newArray);
    setResult(newResult);
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleOperatorAfterResultPress = (operator: string) => {
    const { inputArray: newArray, result: newResult } = handleOperatorAfterResult(operator, result);
    setInputArray(newArray);
    setResult(newResult);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate("History")}>
          <Icon name="history" size={28} color={colorScheme === "dark" ? colors.white : colors.black} />
        </TouchableOpacity>
      )
    })
  }, [colorScheme]);
  return (
    <View style={{ backgroundColor: colorScheme === 'dark' ? colors.black : colors.white, flex: 1 }}>
      <View style={styles.display}>
        <ScrollView horizontal ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
          <CustomText style={{ fontSize: 28 }}>{inputArray.join(' ')}</CustomText>
        </ScrollView>
        <CustomText style={{ fontSize: 38, fontWeight: 'bold' }}>{result}</CustomText>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (button === 'AC') {
                handleClear();
              } else if (button === 'equal') {
                handleEqualPress();
              } else if (button === 'backspace') {
                handleBackspace();
              } else if (['plus', 'minus', 'multiplication', 'division'].includes(button) && result && inputArray.length === 0) {
                handleOperatorAfterResultPress(operatorMap[button]);
              } else {
                handlePress(button);
              }
            }}
            style={[styles.button, { backgroundColor: index === buttons.length - 1 ? colors.primary : colors.grey }]}
          >
            {renderButtonContent(button)}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 20,
    alignItems: 'flex-end',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Home;