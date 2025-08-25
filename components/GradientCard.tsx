import {LinearGradient} from 'react-native-linear-gradient';
import {Text, View} from 'react-native';
import {Button} from '@react-navigation/elements';
import { HalfCircleProgress } from './HalfCircleProgress';

export function GradientCard() {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 16,
      }}>
      <LinearGradient
        colors={[
          'rgba(103, 48, 161, .01)',
          'rgba(103, 48, 161, .25)',
          'rgba(103, 48, 161, .50)',
          'rgba(26, 5, 47, .6)',
        ]}
        useAngle
        locations={[0, 0.7, 0.9, 1]}
        angle={150}
        style={{width: '100%', height: '100%'}}>
        <View style={{padding: 16}}>
          <Text>My Title</Text>

          <Text>3,542/10,000</Text>

          <Button color="rgba(26, 5, 47, 1)">Test</Button>
        </View>
      </LinearGradient>
    </View>
  );
}
