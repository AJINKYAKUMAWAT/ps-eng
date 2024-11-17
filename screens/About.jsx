/* eslint-disable prettier/prettier */

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {IconButton, MD3Colors} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

export default function About() {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />

          <Card.Cover
            style={{padding: 5}}
            source={{uri: 'https://picsum.photos/700'}}
          />
          <Card.Actions style={{position:'relative',left:'-80%'}}>
            <IconButton
            style={{display:'none'}}
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
              <IconButton
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />

            <IconButton
              icon="chat-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
             
          </Card.Actions>
        </Card>
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />

          <Card.Cover
            style={{padding: 5}}
            source={{uri: 'https://picsum.photos/700'}}
          />
          <Card.Actions style={{position:'relative',left:'-80%'}}>
            <IconButton
            style={{display:'none'}}
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
              <IconButton
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />

            <IconButton
              icon="chat-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
             
          </Card.Actions>
        </Card>
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />

          <Card.Cover
            style={{padding: 5}}
            source={{uri: 'https://picsum.photos/700'}}
          />
          <Card.Actions style={{position:'relative',left:'-80%'}}>
            <IconButton
            style={{display:'none'}}
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
              <IconButton
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />

            <IconButton
              icon="chat-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
             
          </Card.Actions>
        </Card>
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />

          <Card.Cover
            style={{padding: 5}}
            source={{uri: 'https://picsum.photos/700'}}
          />
          <Card.Actions style={{position:'relative',left:'-80%'}}>
            <IconButton
            style={{display:'none'}}
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
              <IconButton
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />

            <IconButton
              icon="chat-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
             
          </Card.Actions>
        </Card>
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />

          <Card.Cover
            style={{padding: 5}}
            source={{uri: 'https://picsum.photos/700'}}
          />
          <Card.Actions style={{position:'relative',left:'-80%'}}>
            <IconButton
            style={{display:'none'}}
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
              <IconButton
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />

            <IconButton
              icon="chat-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
             
          </Card.Actions>
        </Card>
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />

          <Card.Cover
            style={{padding: 5}}
            source={{uri: 'https://picsum.photos/700'}}
          />
          <Card.Actions style={{position:'relative',left:'-80%'}}>
            <IconButton
            style={{display:'none'}}
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
              <IconButton
              icon="thumb-up-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />

            <IconButton
              icon="chat-outline"
              iconColor={MD3Colors.primary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
             
          </Card.Actions>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
