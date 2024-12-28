import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
    { label: '2020', value: '2020' },
    { label: '2019', value: '2019' },
    { label: '2018', value: '2018' },
  ]);

  const renderDropdown = () => {
    try {
      return (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          autoScroll={false}
          placeholder="Select..."
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}
          dropDownContainerStyle={{
            maxHeight: 150, // Restrict dropdown height to enable scrolling
            borderWidth: 0,
            overflow: 'hidden',
          }}
          listItemContainerStyle={{
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          }}
          itemStyle={{
            justifyContent: 'flex-start',
            height: 40, // Adjust this value for item height
          }}
        />
      );
    } catch (error) {
      return <Text>Error loading dropdown</Text>;
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}
      >
        {renderDropdown()}
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Chosen year: {value === null ? 'none' : value}</Text>
      </View>
    </SafeAreaView>
  );
}
