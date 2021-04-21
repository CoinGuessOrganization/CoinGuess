import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { Button, Input  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function AApp() {
  const [primary]=useState("#a9a9a9")
  const [secondary]=useState("#d2691e")

  const [dayColor, setDay] = useState(primary);
  const [weekColor, setWeek] = useState(primary);
  const [monthColor, setMonth] = useState(primary);
  const [guess, setGuess] = useState("Seçlen periyot sonunda öngörülen yeni değer")
  const [guessColor, setGuessColor] = useState(primary)

  const pressDay = () => {
    if(dayColor == secondary)setDay(primary)
    else{
      setDay(secondary)
      setWeek(primary)
      setMonth(primary)
    }
  }
  const pressWeek = () => {
    if(weekColor == secondary)setWeek(primary)
    else{
      setDay(primary)
      setWeek(secondary)
      setMonth(primary)
    }
  }
  const pressMounth = () => {
    if(monthColor == secondary)setMonth(primary)
    else{
      setDay(primary)
      setWeek(primary)
      setMonth(secondary)
    }
  }

  const Guess = (value) =>{
    if(value==0){
      setGuess("Seçlen periyot sonunda öngörülen yeni değer")
      setGuessColor(primary)
    }
    else{
      setGuess(value*10)
      setGuessColor("black")
    }
  }
  return (
  <SafeAreaView style={{flex:1,backgroundColor:"#dcdcdc"}}>
    <StatusBar barStyle="dark-content" backgroundColor="#dcdcdc"/>
    <ScrollView>
    <View style={{flex:1,backgroundColor:"#dcdcdc"}}>
      <View style={styles.container}>
        <Text style={styles.title}>Bitcoin</Text>
      </View>

      <View style={styles.container2}>
        <Text style={styles.actual}>Güncel Değer : </Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
              ]
            }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"//y ekseninde değerin sonuna ekliyor
          yAxisInterval={1} // optional, defaults to 1
          
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "black",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <Text style={{fontSize:15,paddingLeft:"40%"}}>Güncel Grafik </Text>
      </View>

      <View style={styles.container3}>
        <View style={{alignItems:"center"}}>
          <Text style={styles.actual}>Öneri Alacağınız Periyodu Seçiniz</Text>
        </View>
        <View style={styles.ButtonGroup}>
          <Button
            buttonStyle={{
              borderRadius:16,
              backgroundColor:dayColor,
            }}
            titleStyle={{
              color:"#f0fff0"
            }}
            onPress={pressDay}
            title="3 Gün"
            type="solid"
          />
          <Button
            buttonStyle={{
              borderRadius:16,
              backgroundColor:weekColor,
            }}
            titleStyle={{
              color:"#f0fff0"
            }}
            onPress={pressWeek}
            title="1 Hafta"
            type="solid"
          />  
          <Button
            buttonStyle={{
              borderRadius:16,
              backgroundColor:monthColor,
            }}
            titleStyle={{
              color:"#f0fff0"
            }}
            onPress={pressMounth}
            title="1 Ay"
            type="solid"
          />
        </View>
        <View  style={{flexDirection:"row",paddingTop:"2.5%",justifyContent:"space-evenly"}}>
        { ((dayColor  != primary) || (weekColor  != primary) || (monthColor  != primary )) &&
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Input
                containerStyle={{
                  width:"40%",
                  overflow:"visible",
                  borderWidth:1,
                  borderRadius:16,
                  borderColor:primary
                }}
                inputStyle={{
                  color:"black",
                }}
                inputContainerStyle={{
                  borderBottomWidth:0,
                }}
                placeholder="Yatırılacak/Elde olan Para"
                placeholderTextColor={primary}
                numeric
                keyboardType={'numeric'}
                onChangeText={value => Guess(value)}
              />
              <View style={styles.GuessStyle}>
                <Text style={{color:guessColor, fontSize:15, paddingLeft:15}}>{guess}</Text>
              </View>
          </View>
        }    
        </View>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
              ]
            }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"//y ekseninde değerin sonuna ekliyor
          yAxisInterval={1} // optional, defaults to 1
          
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "black",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            paddingTop:10
          }}
        />
        <Text style={{fontSize:15,paddingLeft:"40%"}}>Beklenen Grafik</Text>
      </View>
    </View>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"center",
    paddingTop:"4%"
  },
  container2:{
    flex:4,
    justifyContent:"flex-start"
  },
  container3: {
    flex: 6,
    alignSelf:"center",
    paddingTop:"4%",
  },
  title:{
    alignItems: 'center',
    fontSize:30,
    fontWeight:'bold',
  },
  actual:{
    paddingLeft:"2%",
    fontSize:20,
  },
  ButtonGroup:{
    flexDirection:"row",
    justifyContent:"space-around",
    paddingTop:"3%"
  },
  GuessStyle:{
    maxWidth:"40%",
    minWidth:"40%",
    borderWidth:1,
    borderColor:"#a9a9a9",
    borderRadius:16,
    alignItems:"center",
    justifyContent:"center"
  }
});
