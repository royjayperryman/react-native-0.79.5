import {LinearGradient} from 'expo-linear-gradient';
import {Text, View} from 'react-native';

export function ColorCard() {
  return (
    <View
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 16,
      }}>
      <View
        style={{
          position: 'absolute',
          maxHeight: 80,
          maxWidth: 100,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={['rgb(95, 194, 255)', 'rgba(160, 209, 255, 0.07)', 'white']} // Your desired colors
          start={{x: 0, y: 0}} // Starts at the top-left corner
          end={{x: 1, y: 1}} // Ends towards the center-right
          style={{
            height: '100%',
            width: 80,
          }}
        />
        <LinearGradient
          colors={['rgb(205, 236, 255)', 'white']} // Your desired colors
          start={{x: 0, y: 0}} // Starts at the top-left corner
          end={{x: 0.5, y: 0.5}} // Ends towards the center-right
          style={{
            height: '100%',
            width: 80,
            borderTopLeftRadius: 22,
            margin: 2,
            position: 'absolute',
          }}
        />
      </View>
      <View style={{margin: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderColor: 'rgb(54, 169, 240)',
              borderWidth: 1,
              borderRadius: 16,
              width: 50,
              height: 50,
            }}>
            <Text>Test</Text>
          </View>
          <View style={{marginStart: 16}}>
            <Text>Header</Text>
            <Text>Subtite</Text>
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <Text>Test</Text>
        </View>
      </View>
    </View>
  );
}
