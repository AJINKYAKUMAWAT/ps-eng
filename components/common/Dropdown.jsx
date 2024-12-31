import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  TextInput,
} from 'react-native';

export default function DropdownList({data}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsModalVisible(false); // Close modal after selecting an item
  };

  return (
    <View style={styles.container}>
      {/* Custom Dropdown */}
      <TouchableOpacity style={styles.inputContainer} onPress={toggleModal}>
        <TextInput
          style={styles.input}
          placeholder="Select"
          value={selectedItem ? selectedItem.label : data[0].label}
          editable={false}
        />
      </TouchableOpacity>

      {/* Modal for Dropdown */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={toggleModal}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleItemSelect(item)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  inputContainer: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    fontSize: 16,
    padding: 8,
    paddingRight:0,
    color:'#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    maxHeight: 250, // Adjust this height to control the size of the modal
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  item: {
    paddingVertical: 10, // Adjust vertical padding to reduce item height
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color:'#000'
  },
  selectedItemContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
