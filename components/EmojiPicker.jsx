import React, { useState } from 'react';
import { View, Modal, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from 'emoji-mart-native';

const EmojiPickerComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native); // Use emoji.native to get the actual emoji character
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onLongPress={handleLongPress} style={{ padding: 20, backgroundColor: 'lightgray' }}>
        <Text>Hold Me</Text>
      </TouchableOpacity>

      {selectedEmoji && (
        <Text style={{ fontSize: 50, margin: 20 }}>
          {selectedEmoji}
        </Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, height: 400, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <Picker onSelect={handleEmojiSelect} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmojiPickerComponent;
