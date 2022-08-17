import { Text, View } from 'react-native';
import { useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(30);
  function timer(seconds) {
    let remaningTime = seconds;
    setTimeout(function () {
      setTime(remaningTime);
      console.log(remaningTime);
      if (remaningTime > 0) {
        timer(remaningTime - 1);
      }
    }, 1000);
  }

  timer(30);
  return (
    <View>
      <Text>Timer: {time}</Text>
    </View>
  );
}
