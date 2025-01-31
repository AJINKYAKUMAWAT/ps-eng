import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import ButtonWithIcon from './ButtonWithIcon';
import {typography} from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ControlModal({showModal,onPress,onCancel,CONFIRMATION_MESSAGES}) {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <Modal
        isVisible={showModal}
        swipeDirection="left"
        animationIn="zoomIn" // Zoom in effect when modal appears
        animationOut="zoomOut" // Zoom out effect when modal disappears
        animationInTiming={600} // Animation time in milliseconds for entering
        animationOutTiming={600} // Animation time for exiting
        backdropTransitionInTiming={500} // Time for backdrop transition
        backdropTransitionOutTiming={500} // Time for backdrop transition
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Icon
            name="delete-alert"
            color="#ff4b47"
            size={50}
            style={{marginHorizontal: 2,padding:15}}
          />
          <Text
            style={{
              fontSize: 16,
              marginBottom: 15,
              color: '#000',
              fontFamily: typography.primary,
            }}>
            {CONFIRMATION_MESSAGES}
          </Text>
          <View
            style={{
              zIndex: 1000,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              marginTop: 10,
            }}>
            {/* Date and Time Picker */}
            <View
              style={{
                flex: 1,
                paddingRight: 5,
              }}>
              <ButtonWithIcon
                title="Cancel"
                color="#4894FE"
                onPress={onCancel}
              />
            </View>
            {/* Dropdown */}
            <View
              style={{
                flex: 1,
                paddingLeft: 5,
              }}>
              <ButtonWithIcon
                title="Submit"
                background="#4894FE"
                color="#fff"
                onPress={onPress}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ControlModal;
