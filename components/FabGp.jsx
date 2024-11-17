import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal, PaperProvider } from 'react-native-paper';

const FabGroup = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        style={[styles.fabGroup]}
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fabGroup: {
    position: 'absolute',
    bottom: 50,
  },
  fabGroupOpen: {
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent black background
  },
});

export default FabGroup;
