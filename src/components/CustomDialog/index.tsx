import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, GestureResponderEvent, useColorScheme } from 'react-native';
import { colors } from '../../theme/colors';
import CustomText from '../CustomText';

interface CustomDialogProps {
    dialogVisible: boolean;
    setDialogVisible: (visible: boolean) => void;
    title: string;
    description: string;
    onCancel?: (event: GestureResponderEvent) => void;
    onOk: (event: GestureResponderEvent) => void;
    cancelText?: string;
    okText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
    dialogVisible,
    setDialogVisible,
    title,
    description,
    onCancel,
    onOk,
    cancelText = 'Cancel',
    okText = 'OK',
}) => {
    const handleCancel = (event: GestureResponderEvent) => {
        if (onCancel) {
            onCancel(event);
        }
        setDialogVisible(false);
    };
    const colorScheme = useColorScheme();
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={dialogVisible}
                onRequestClose={() => {
                    setDialogVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: colorScheme === "dark" ? colors.black : colors.white }]}>
                        <CustomText style={styles.titleText}>{title}</CustomText>
                        <CustomText style={styles.descriptionText}>{description}</CustomText>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, { backgroundColor: colors.primary }]}
                                onPress={handleCancel}>
                                <CustomText style={styles.textStyle}>{cancelText}</CustomText>
                            </Pressable>
                            <Pressable
                                style={[styles.button, { backgroundColor: colors.primary }]}
                                onPress={onOk}>
                                <CustomText style={styles.textStyle}>{okText}</CustomText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '40%',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CustomDialog;