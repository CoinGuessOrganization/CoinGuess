import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, StatusBar, TouchableOpacity,
  RefreshControl, ScrollView, ImageBackground } from 'react-native';
import { Button, Input  } from 'react-native-elements';
import { LineChart } from "react-native-chart-kit";
import { Entypo } from '@expo/vector-icons'; 
import axios from 'axios';

export default function AApp(props) {
  const [primary]=useState("#a9a9a9")
  const [secondary]=useState("#d2691e")

  const [symbol, setSymbol] = useState("$")
  const [unit, setUnit] = useState("USD");
  const [dolarPrice, setDolarPrice] = useState("2");
  const [advise, setadvise] = useState(null)
  
  const [predicts, setPredicts] = useState({});
  const [predictsTRY, setPredictsTRY] = useState({});
  const [predictsUSD, setPredictsUSD] = useState({});

  const [historicalData, setHistoricalData] = useState({});
  const [historicalDataTRY, setHistoricalDataTRY] = useState({});
  const [historicalDataUSD, setHistoricalDataUSD] = useState({});

  const [dates, setDates] = useState({});

  useEffect(() => {
    var predictsArrayUSD = [];
    var historicalArrayUSD = [];
    var datesArray = [];

    getServiceData(function(result){

      result["predicts"].forEach(element => {
        predictsArrayUSD.push(element);       
      });

      result["historicalData"].forEach(element => {
        historicalArrayUSD.push(element);
      });

      result["dates"].forEach(element => {
        datesArray.push(element);          
      });

      setDates(datesArray);
      setHistoricalDataUSD(historicalArrayUSD);
      setPredictsUSD(predictsArrayUSD);

      if(props.route.params==undefined){
        setHistoricalData(historicalArrayUSD);
        setPredicts(predictsArrayUSD);
        setSymbol("$");
      }
      else{
        setHistoricalData(historicalDataTRY);
        setPredicts(predictsTRY);
        setSymbol("₺");
      }

      if(predictsArrayUSD[0] > predictsArrayUSD[1]){
        setadvise("Elinizde bulunan kripto parayı satın, yeni alım yapmayın.")
      }
      else{
        setadvise("Elinizde bulunan kripto parayı bekletin, yeni alım yapabilirsiniz.")
      }
    });
  },[])

  useEffect(()=>{
    if((props.route.params!=undefined)&&(props.route.params.unit!=unit)){
        setUnit(props.route.params.unit)
        if(unit=="USD"){
          setHistoricalData(historicalDataTRY);
          setPredicts(predictsTRY);
          setSymbol("₺");
        }
        else{
          setHistoricalData(historicalDataUSD);
          setPredicts(predictsUSD);
          setSymbol("$");
        }
    }
    if((props.route.params!=undefined)&&(props.route.params.dolarPrice!=dolarPrice)){
        setDolarPrice(props.route.params.dolarPrice)
        var predictsArrayTRY = [];
        var historicalArrayTRY = [];

        getServiceData(function(result){
          result["predicts"].forEach(element => {
            predictsArrayTRY.push(element*props.route.params.dolarPrice);          
          });
    
          result["historicalData"].forEach(element => {
            historicalArrayTRY.push(element*props.route.params.dolarPrice);
          });

          setHistoricalData(historicalArrayTRY);
          setPredicts(predictsArrayTRY);

          setHistoricalDataTRY(historicalArrayTRY);
          setPredictsTRY(predictsArrayTRY);
        }); 
    }
  })

  function getServiceData(callback){
    setRefreshing(true);
    axios.get(`http://192.168.1.4:5821/flaskweb/api/BTC`)
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
    date = date.toLocaleDateString();
    return date;
  }

  return (
  <SafeAreaView style={{flex:1,backgroundColor:"#dcdcdc"}}>
    <ScrollView
        contentContainerStyle={styles.scrollView,{justifyContent:"space-between"}}
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
            onPress={()=> props.navigation.openDrawer()}
          >
            <Entypo 
              name="menu" 
              size={37} 
              color="black" 
            />
          </TouchableOpacity>
          <Text style={styles.title}>Bitcoin</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.actual}>Güncel Değer : {predicts[0].toFixed(2)} {symbol} </Text>
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
            height={350}
            yAxisSuffix={symbol}//y ekseninde değerin sonuna ekliyor
            yAxisInterval={1} // optional, defaults to 1
            horizontalLabelRotation={315}
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
                r: "4",
                strokeWidth: "2",
                stroke: "#ffa726"
              },           
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
          <View style={styles.adviseStyle}>
                  <Text style={{color:"black", fontSize:20, paddingLeft:15}}>{advise}</Text>
          </View> 
          <LineChart
            data={{
              labels: [dateLabel(1), " ", " ", " ", " ",
                      dateLabel(6), " ", " ", " ", " ", " ",
                      dateLabel(12), " ", " ", " ", " ", " ",
                      dateLabel(18), " ", " ", " ", " ", " ",
                      dateLabel(24), " ", " ", " ", " ", " ",
                      dateLabel(30)

            ],
              datasets: [
                {
                  data: predicts
                }
                ]
              }}
            width={Dimensions.get("window").width} // from react-native
            height={350}
            yAxisSuffix={symbol}//y ekseninde değerin sonuna ekliyor
            yAxisInterval={1} // optional, defaults to 1
            horizontalLabelRotation={315}
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
                r: "4",
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
          <Text style={{fontSize:15,paddingLeft:"42%"}}>Beklenen Grafik</Text>
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
    justifyContent: "space-between",
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
    right: Dimensions.get("window").width/2 - 37,
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
  adviseStyle:{
    borderColor:"#a9a9a9",
    borderRadius:16,
    alignItems:"center",
    justifyContent:"center",
    height:Dimensions.get("window").height/7,
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
