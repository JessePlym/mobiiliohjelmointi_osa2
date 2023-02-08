import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import Result from './components/Result';
import { styles } from './style';
import { API_BASE, API_TOKEN } from '@env';

export default function App() {
  const [inputAmount, setInputAmount] = useState("");
  const [euroAmount, setEuroAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [exhangeRates, setExhangeRates] = useState({});

  useEffect(() => {
    fetch(`${API_BASE}=${API_TOKEN}`)
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions([...Object.keys(data.rates)]);
      setExhangeRates(data.rates);
    })
    .catch(err => console.log(err));
  }, []);

  const convertAmount = () => {
    const currencyIndex = currencyOptions.indexOf(currency);
    const exhangeRate = Object.values(exhangeRates)[currencyIndex] as number; 
    setEuroAmount(parseFloat(inputAmount) / exhangeRate);
  }

  return (
    <View style={styles.container}>
      <Result euroAmount={euroAmount}/>
      <View style={styles.input}>
        <TextInput 
          style={styles.textInput}
          keyboardType="numeric"
          value={inputAmount}
          onChangeText={text => setInputAmount(text)}
        />
        <Picker 
          style={styles.textInput}
          selectedValue={currency}
          onValueChange={(itemValue, itemIndex) => {
            setCurrency(itemValue)
          }}
        >
        {currencyOptions.map((currency, index) => (
          <Picker.Item 
            label={currency} 
            value={currency} 
            key={index}
          />
        ))}
        </Picker>
      </View>
      <Button 
        title="Convert"
        onPress={convertAmount}
      />
    </View>
  );
}
