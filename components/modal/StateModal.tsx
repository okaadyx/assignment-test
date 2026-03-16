import React from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../constants/Theme';
import { INDIAN_STATES } from '../../constants/SignupConstants';

const { height } = Dimensions.get('window');

interface StateModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (state: string) => void;
  selectedState?: string;
}

export const StateModal: React.FC<StateModalProps> = ({
  visible,
  onClose,
  onSelect,
  selectedState
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select State</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={INDIAN_STATES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.stateItem}
                onPress={() => onSelect(item)}
              >
                <Text style={[
                  styles.stateItemText,
                  selectedState === item && styles.stateItemTextSelected
                ]}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.7,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  stateItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  stateItemText: {
    fontSize: 16,
    color: Colors.text,
  },
  stateItemTextSelected: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
