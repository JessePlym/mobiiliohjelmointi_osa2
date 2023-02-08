import { Image, View, Text } from "react-native"
import { styles } from "../style"

interface Props{
  euroAmount: number;
}

export default function Result({ euroAmount }: Props) {
  return (
    <View style={styles.result}>
      <Image 
        style={{ width: 170, height: 100}}
        source={require('../img/coin.png')}
      />
      <Text style={styles.text}>{euroAmount.toFixed(2)} €</Text>
    </View>
  )
}
