import { View, Text, ScrollView, PanResponder } from 'react-native';
import React, { useRef, useState } from 'react';

const AboutScreen = () => {
  const [positionX, setPositionX] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Adjust the threshold as per your requirement
        const swipeThreshold = 50;

        if (gestureState.dx > swipeThreshold) {
          // Right swipe
          setPositionX(gestureState.dx);
        } else if (gestureState.dx < -swipeThreshold) {
          // Left swipe
          setPositionX(gestureState.dx);
        } else {
          // Reset the position if not swiping left or right
          setPositionX(0);
        }
      },
      onPanResponderEnd: (_, gestureState) => {
        // Determine the swipe direction after the gesture ends
        const swipeThreshold = 50;

        if (gestureState.dx > swipeThreshold) {
          console.log('Right swipe');
          // You can add any logic here for the right swipe action
        } else if (gestureState.dx < -swipeThreshold) {
          console.log('Left swipe');
          // You can add any logic here for the left swipe action
        } else {
          console.log('No swipe');
        }

        // Reset position after the swipe gesture is released
        setPositionX(0);
      },
    })
  ).current;

  return (
    <ScrollView style={{ backgroundColor: '#e6e8fa', padding: 10 }}>

      <Text style={{ position: 'absolute', right: 10, opacity: positionX < 0 ? 1 : 0 }}>
        Swiping Left
      </Text>

      <View
        style={{
          //flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          backgroundColor: 'orange',
          transform: [{ translateX: positionX }],
        }}
        {...panResponder.panHandlers}
      >


        <Text style={{ fontSize: 30, fontWeight: 'bold', }}>AboutScreen</Text>


      </View>

      <Text style={{ position: 'absolute', left: 10, opacity: positionX > 0 ? 1 : 0 }}>
        Swiping Right
      </Text>


    </ScrollView>
  );
};

export default AboutScreen;
