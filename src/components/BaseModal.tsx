import React from 'react';
import {
    Modal,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Colors } from '../constants/theme';

interface BaseModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({ isVisible, onClose, children }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.modalBackdrop}
                onPress={onClose}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                    style={styles.modalContainer}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                        {children}
                    </Pressable>
                </KeyboardAvoidingView>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: Colors.surface,
        borderRadius: 40,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    }
});
