import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, StatusBar, TouchableOpacity,
  RefreshControl, ScrollView, ImageBackground} from 'react-native';
import { Button, Input  } from 'react-native-elements';
//import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from "react-native-chart-kit";
import { Entypo } from '@expo/vector-icons'; 
import axios from 'axios';

export default function AApp({navigation}) {
  const [primary]=useState("#a9a9a9")
  const [secondary]=useState("#00008b")

  const [dayColor, setDay] = useState(primary);
  const [weekColor, setWeek] = useState(primary);
  const [monthColor, setMonth] = useState(primary);

  const [guess, setGuess] = useState("Seçlen periyot sonunda öngörülen yeni değer")
  const [guessColor, setGuessColor] = useState(primary)


  const [predicts, setPredicts] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  const [dates, setDates] = useState({});

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
      var res = value/predicts[0];

      var predictOfPeriod = predicts[3];

      if(weekColor == secondary){

        predictOfPeriod = predicts[7];

      }else if(monthColor == secondary){

        predictOfPeriod = predicts[30];
      }

      setGuess((res*predictOfPeriod).toFixed(2))
      setGuessColor("black")
    }
  }
  
  useEffect(() => {
    var predictsArray = [];
    var historicalArray = [];
    var datesArray = [];

    getServiceData(function(result){

      result["predicts"].forEach(element => {
        predictsArray.push(element);          
      });

      result["historicalData"].forEach(element => {
        historicalArray.push(element);          
      });
      
      result["dates"].forEach(element => {
        datesArray.push(element);          
      });

      setDates(datesArray);
      setHistoricalData(historicalArray);
      setPredicts(predictsArray);
    });   
  },[])


  function getServiceData(callback){
    setRefreshing(true);
    axios.get(`http://192.168.1.105:5821/flaskweb/api/XRP`)

    .then(res => {

      callback(res["data"]);
      wait(2000).then(() => setRefreshing(false));
    }).catch(error => console.error(error));
    
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);


  function dateLabel(days){
    var date = new Date();
    date.setDate(date.getDate() + days);
    date = date.toISOString();
    date = date.slice(5,10);
    return date;
  }  
  return (
  <SafeAreaView style={{flex:1,backgroundColor:"#dcdcdc"}}>
    <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
    <StatusBar barStyle="dark-content" backgroundColor="#dcdcdc" hidden/>
    {!refreshing &&
      <View style={{flex:1,backgroundColor:"#dcdcdc"}}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={()=> navigation.openDrawer()}
          >
            <Entypo 
              name="menu" 
              size={37} 
              color="black" 
            />
          </TouchableOpacity>
          <Text style={styles.title}>Ripple</Text>
        </View>


        <View style={styles.container2}>
          <Text style={styles.actual}>Güncel Değer : {predicts[0].toFixed(2)} $ </Text>
          <LineChart
            data={{
              labels: [ dates[0].slice(5,10), " ", " ", " ", " ", " ",
                        dates[6].slice(5,10), " ", " ", " ", " ", " ",
                        dates[12].slice(5,10), " ", " ", " ", " ", " ",
                        dates[18].slice(5,10), " ", " ", " ", " ", " ",
                        dates[24].slice(5,10), " ", " ", " ", " ", 
                        dates[29].slice(5,10)

            ],
              datasets: [
                {
                  data: historicalData
                }
                ]
              }}
            width={Dimensions.get("window").width} // from react-native
            height={330}
            yAxisSuffix="$"//y ekseninde değerin sonuna ekliyor
            yAxisInterval={1} // optional, defaults to 1
            horizontalLabelRotation={315}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#00008b",
              backgroundGradientTo: "black",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#00008b"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          <Text style={{fontSize:15,paddingLeft:"42%"}}>Güncel Grafik </Text>
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


          { ((dayColor  != primary) || (weekColor  != primary) || (monthColor  != primary )) &&
            <View>
              <View  style={{flexDirection:"row",paddingTop:"1.5%",justifyContent:"space-evenly"}}>
                    <Input
                      containerStyle={{
                        width:"40%",
                        overflow:"visible",
                        borderWidth:1,
                        borderRadius:16,
                        borderColor:primary,
                      }}
                      inputStyle={{
                        color:"black",
                      }}
                      inputContainerStyle={{
                        borderBottomWidth:0,
                      }}
                      label=" "
                      placeholder="Mevcut değer"
                      placeholderTextColor={primary}
                      numeric
                      keyboardType={'numeric'}
                      onChangeText={value => Guess(value)}
                    />
                    <View style={styles.GuessStyle}>
                      <Text style={{color:guessColor, fontSize:15, paddingLeft:15}}>{guess}</Text>
                    </View> 
              </View>
              <LineChart
                data={{
                  labels: [dateLabel(1), " ", " ", " ", " ", " ",
                          dateLabel(7), " ", " ", " ", " ", " ",
                          dateLabel(13), " ", " ", " ", " ", " ",
                          dateLabel(19), " ", " ", " ", " ", " ",
                          dateLabel(25), " ", " ", " ", " ", 
                          dateLabel(31)
    
                ],
                  datasets: [
                    {
                      data: predicts
                    }
                    ]
                  }}
                width={Dimensions.get("window").width} // from react-native
                height={330}
                yAxisSuffix="$"//y ekseninde değerin sonuna ekliyor
                yAxisInterval={1} // optional, defaults to 1
                horizontalLabelRotation={315}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#00008b",
                  backgroundGradientTo: "black",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: "#00008b"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  paddingTop:10
                }}
              />
              <Text style={{fontSize:15,paddingLeft:"42%"}}>Beklenen Grafik</Text>
          </View>
          }
        </View>
      </View>
      }
      {refreshing &&
        <ImageBackground source={require('../assets/3.png')} style={styles.loadingScreen}/>
      }
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:"4%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container2:{
    flex:4,
    justifyContent:"flex-start"
  },
  container3: {
    flex: 6,
    alignSelf:"center",
    paddingTop:"1.5%",
    width:"100%"
  },
  title:{
    alignItems: 'center',
    fontSize:30,
    fontWeight:'bold',
    right: Dimensions.get("window").width/2 - 37
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
  },
  loadingTextColor:{
    alignSelf:"center",
    alignContent:"center",
    justifyContent:"center",
    color: "#e26a00",
    fontWeight: "bold",
    fontSize:15
  },
  loadingScreen:{
    height:Dimensions.get("window").height,
  }
});
