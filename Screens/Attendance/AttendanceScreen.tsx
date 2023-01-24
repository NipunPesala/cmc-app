import React, {useState, useEffect} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Header from '../../Components/Header';
import ComponentsStyles from '../../Constant/Components.styles';
import {useNavigation} from '@react-navigation/native';
import ActionButton from '../../Components/ActionButton';
import style from './Style';
import {format} from 'date-fns';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AttendanceDetails} from '../../Constant/DummyData';
import AttendanceTableHeaderComponent from '../../Components/AttendanceTableHeaderComponent';
import AttendanceTableDetailsComponent from '../../Components/AttendanceTableDetailsComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import LeftRightArrowbarComponent from '../../Components/LeftRightArrowbarComponent';

import Style from './Style';
import IconA from 'react-native-vector-icons/Ionicons';
import comStyles from '../../Constant/Components.styles';
import InputText from '../../Components/InputText';
import {
  getALLReadingDetails,
  getALLReadingDetailsbyDates,
  getLastMeterReadingValueType,
  saveMeterReading,
  getALLReadingDetailsbyDateRange,
} from '../../SQLiteDatabaseAction/DBControllers/MeterReadingController';

let height = Dimensions.get('screen').height;
const AttendanceScreen = () => {
  const navigation = useNavigation();
  const [first30dayse, setfirst30dayse] = useState(false);
  const [first7days, setfirst7days] = useState(false);
  const [customdays, setcustomdays] = useState(false);
  //const [listdata, setlistdata] = useState(AttendanceDetails);

  const [listdata, setlistdata] = useState('');

  const [attendanceDetails1, setAttendanceDetails] = useState(false);
  const [remarks, setRemarks] = useState(false);
  const [bottomview, setbottomview] = useState(false);
  const [filterRegex, setFilterRegex] = useState(/./);
  const [filterText, setFilterText] = useState('');

  const [show, setShow] = useState(false);
  const [dateType, setDateType] = useState('');

  const [meterValue, setMeterValue] = useState('');

  const [remark, setremark] = useState('');

  const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
  const [image, setImage] = useState();
  const [isShowSweep, setIsShowSweep] = useState(true);
  const [ImgStatus, setImgStatus] = useState(false);

  const [lastMeterReadervalue, setlastMeterReadervalue] = useState('');
  const [readingType, setreadingType] = useState('');

  //let actionButonHeading="ADD DAY START";
  // let attendance_savebutton="Let's Get Day Start";
  const [actionButonHeading, setactionButonHeading] = useState('');
  const [attendance_savebutton, setattendance_savebutton] = useState('');

  const [curstomDate, setcustomDate] = useState('');
  const [lastDate, setlastDate] = useState('');


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const start = moment(startDate).format("YYYY-MM-DD");
  console.log('new start'+start);
  const end = moment(endDate).format("YYYY-MM-DD");
  console.log('new end'+end);
//
  const [entriesWithTimeDifference, setEntriesWithTimeDifference] = useState([]);
  const [totalTimeDifference, setTotalTimeDifference] = useState(0);
  const [overtimeSum, setOvertimeSum] = useState(0);

  const testresult = [
    {"date": "2023-01-20", "inremark": "Hhh", "intime": "2023-01-20 13:11:53", "outremark": "2023-01-20 20:11:53", "overtime": "20", "shift": "IN", "twhour": "", "value": 158},
    {"date": "2023-01-20", "inremark": "Ryu", "intime": "2023-01-20 13:23:25", "outremark": "2023-01-20 18:11:53", "overtime": "30", "shift": "OUT", "twhour": "", "value": 128},
    {"date": "2023-01-20", "inremark": "Ryu", "intime": "2023-01-20 13:24:36", "outremark": "2023-01-20 15:11:53", "overtime": "40", "shift": "IN", "twhour": "", "value": 128}
  ];
  // const route=useRoute();

  

  useEffect(() => {
    // calculate total working hours
    
    // let newEntries = [...testresult];
    // let totalDiff = 0;
    // for (let i = 0; i < newEntries.length; i++) {
    //     const inTime = new Date(newEntries[i].intime);
    //     const outTime = new Date(newEntries[i].outtime);
    //     const timeDifference = outTime - inTime/3600000;
    //     totalDiff += timeDifference;
    //     newEntries[i] = {
    //       ...newEntries[i],
    //       timeDifference
    //     };
    // }
    // setEntriesWithTimeDifference(newEntries);
    // setTotalTimeDifference(totalDiff);




    ///////////////////////////////////////////

    //getTotalWorkingHours();
   // getTotalOverTime();
    console.log('use66');
    if (typeof filterText == 'string') {
      let regex = new RegExp(`(${filterText})`);
      setFilterRegex(regex);
    } else {
      setFilterRegex(/./);
    }
  }, [filterText]);


 // calculate total working hours
    
const getTotalWorkingHours=()=>{
 let newEntries = [...testresult];
    let totalDiff = 0;
    for (let i = 0; i < newEntries.length; i++) {
        const inTime = new Date(newEntries[i].intime);
        const outTime = new Date(newEntries[i].outtime);
        const timeDifference = outTime - inTime/3600000;
        totalDiff += timeDifference;
        newEntries[i] = {
          ...newEntries[i],
          timeDifference
        };
    }
    setEntriesWithTimeDifference(newEntries);
    setTotalTimeDifference(totalDiff);
  
}

// calculate OT
const getTotalOverTime=()=>{
  let overtimeTotal = 0;
  for(let i=0; i< testresult.length;i++){
    overtimeTotal += parseInt(testresult[i].overtime);
  }
  setOvertimeSum(overtimeTotal);

}
  // const onChange = (event: any, selectedDate: any) => {
  //   const currentDate = selectedDate;
  //   setShow(Platform.OS === 'ios');
  //   var datec = moment(new Date(currentDate)).format('YYYY-MM-DD');
  //   console.log(datec);
  //   setcustomDate(datec);
  //   setFilterText(datec);
  // };
  const handle30days = () => {
    setfirst30dayse(true);
    setcustomdays(false);
    setfirst7days(false);
    var Old_date = new Date();
    Old_date.setDate(Old_date.getDate() - 30);
    var formattedDate = format(Old_date, 'yyyy-MM-dd');
    setlastDate(formattedDate);
    getAllAttendanceDetailsbyDates(formattedDate);
  };
  const handlecustomedays = (currentMode: any) => {
    setfirst30dayse(false);
    setcustomdays(true);
    setfirst7days(false);
    setShow(true);
    setDateType(currentMode);
    console.log(curstomDate, ' &&&&&&............');
    getALLReadingDetailsbyCustome(curstomDate);
  };
  const handale7days = () => {
    setfirst30dayse(false);
    setcustomdays(false);
    setfirst7days(true);
    setlastDate('');
    var Old_date = new Date();
    Old_date.setDate(Old_date.getDate() - 7);
    var formattedDate = format(Old_date, 'yyyy-MM-dd');
    setlastDate(formattedDate);
    getAllAttendanceDetailsbyDates(formattedDate);
  };
  const HandleAttendanceDetails = () => {
    setAttendanceDetails(true);
    setbottomview(true);
    setRemarks(false);
  };
  const handleRemak = () => {
    console.log(attendanceDetails1);

    setAttendanceDetails(false);
    setRemarks(true);
  };
  useEffect(() => {
    console.log('use');
    setfirst30dayse(false);
    setcustomdays(false);
    setfirst7days(true);
    setAttendanceDetails(true);
    setRemarks(false);

    getAllAttendanceDetails();
  }, []);

  useEffect(() => {
    console.log('ATTENDANCE _107 --', +listdata);
    const focusHandler = navigation.addListener('focus', () => {
      getLastReadervalue();
      setHeaderNames();
    });
    return focusHandler;
  }, []);

  const newValidateDayendvalue = () => {
    if (meterValue != '') {
      if (/^[0-9]+$/.test(meterValue)){
        if (remark != '') {
          if (parseInt(meterValue) >= parseInt(lastMeterReadervalue)) {
            insertMeterReading();
          }else{
            ToastAndroid.show('Meter Reading Save Failed.Invalid Meter Value in Day End ', ToastAndroid.SHORT);
            insertMeterReading();
          }
        } else {
          ToastAndroid.show('pleas enter  remark ', ToastAndroid.SHORT);
        }
      }else{
        ToastAndroid.show('Please Enter only numeric characters.', ToastAndroid.SHORT);
      }
    
    } else {
      ToastAndroid.show('pleas enter meter valuve ', ToastAndroid.SHORT);
      console.log('Enter meater valuve');
    }
  };

  const openCamera=()=>{

    
  }
  const slideInModal = () => {
  
    setIsShowSweep(false);
    //console.log('sampleIn',+height);

    Animated.timing(modalStyle, {
      toValue: height / 8,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const slideOutModal = () => {
    getLastReadervalue();
    getAllAttendanceDetails();

    setIsShowSweep(true);
    Keyboard.dismiss();
    Animated.timing(modalStyle, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const validateDayendvalue = () => {
    try {
      if (meterValue != '') {
        if (parseInt(meterValue) >= parseInt(lastMeterReadervalue)) {
          insertMeterReading();
        } else {
          Alert.alert(
            'Failed...!',
            'Meter Reading Save Failed.Invalid Meter Value in Day End',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLastReadervalue = () => {
    try {
      getLastMeterReadingValueType((result: any) => {
        for (let i = 0; i < result.length; ++i) {
          setlastMeterReadervalue(result[i].value);
          setreadingType(result[i].readingType);

          if (result[i].readingType == 'OUT') {
            setactionButonHeading('ADD DAY START');
            setattendance_savebutton("Let's Get Day Start");
          } else {
            setactionButonHeading('ADD DAY END');
            setattendance_savebutton("Let's Get Day End");
          }
        }
      });
    } catch (error) {
      console.log('ATTENDANCE GET LAST ' + error);
    }
  };

  const setHeaderNames = () => {
    // console.log("&&&&&&<><1>$$$$$$$$$$$$$$<>",readingType);
    //last reading type check
    if (readingType == 'OUT') {
      // console.log("&&&&&&<>2<>$$$$$$$$$$$$$$$$$$$<>",readingType);
      setactionButonHeading('ADD DAY START');
      setattendance_savebutton("Let's Get Day Start");
    } else {
      setactionButonHeading('ADD DAY END');
      setattendance_savebutton("Let's Get Day End");
    }
  };

  const getAllAttendanceDetailsbyDates = (date: any) => {
    try {
      getALLReadingDetailsbyDates(date, (result: any) => {
        setlistdata(result);
        for(const key in result){
          console.log(result[key]);
      }
        console.log('this is 7 days' , result);
      });
    } catch (error) {
      console.log('ATTENDANCE GET ALL date wise ' + error);
    }
  };

  const getALLReadingDetailsbyCustome = (date: any) => {
    try {
      console.log(date, ' &&&&&&............');

      getALLReadingDetailsbyDates(date, (result: any) => {
        //console.log("ATTENDANCE GET ALL ****** "+JSON.stringify(result));
        setlistdata(result);
      });
    } catch (error) {
      console.log('ATTENDANCE GET ALL date custome ' + error);
    }
  };

  const getDateRangeResult=(DateOne:any,DateTwo:any)=>{
    getALLReadingDetailsbyDateRange(DateOne, DateTwo, (result:any) => {

      setlistdata(result);
        
    });
    
}

  const getAllAttendanceDetails = () => {
    try {
      getALLReadingDetails((result: any) => {
        //console.log("ATTENDANCE GET ALL ****** "+JSON.stringify(result));
        setlistdata(result);
      });
    } catch (error) {
      console.log('ATTENDANCE GET ALL ' + error);
    }
  };
  /////////////////////////////////////day end detais save in db/////////////////

  const insertMeterReading = () => {
    var _readingtype = '';
    var _status = 0;
    var _remark = remark;
    //console.log("&&&&&&<>3<><>",readingType);

    if (readingType == 'OUT' || readingType == '') {
      _readingtype = 'IN';
      _status = 1;
    } else {
      _readingtype = 'OUT';
      _status = 2;
    }

    if (ImgStatus || meterValue != '') {
      if (ImgStatus && meterValue != '') {
        try {
          //console.log("$$2222$$$$" +meterValue);
          let mValue = parseFloat(meterValue);

          let data = [
            {
              //mrId: 1,
              empID: 1,
              readingType: _readingtype,
              date: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
              location: 'horana',
              value: mValue,
              status: _status,
              remark: _remark,
            },
          ];

          saveMeterReading(data, (result: any) => {
            console.log(result, '/<><><> 1<><>');

            if (result === 'success') {
              ToastAndroid.show(
                'Attendance saved success ',
                ToastAndroid.SHORT,
              );
              slideOutModal();
            } else {
              Alert.alert('Failed...!', 'Meter Reading Save Failed.', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else if (ImgStatus) {
        slideOutModal();
      } else if (meterValue != '') {
        try {
          // console.log("$$$$$$" +meterValue);
          let mValue = parseFloat(meterValue);
          //console.log("$$******$$$$" +mValue);
          let data = [
            {
              // mrId: 1,
              empID: 1,
              readingType: _readingtype,
              date: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
              location: 'horana',
              value: mValue,
              status: _status,
              remark: _remark,
            },
          ];

          saveMeterReading(data, (result: any) => {
            console.log(result, '/<><><> 2<><>');

            if (result === 'success') {
              ToastAndroid.show(
                'Attendance saved success ',
                ToastAndroid.SHORT,
              );
              slideOutModal();
            } else {
              Alert.alert('Failed...!', 'Meter Reading Save Failed.', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      Alert.alert(
        'Warning...!',
        'Please Enter Meter Value or Submit a Photo of meter.',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
      );
    }
  };


  const handleDateChange = (date) => {
    if (!startDate) {
      setStartDate(date);
      console.log('start date-'+date );

    }else if(date>startDate) {
        setEndDate(date);
        console.log('End date-'+date);
       // getDateRangeResult(start,end);
        getDateRangeResult(start,end);
        setShowCalendar(false);
      
    }else{
        ToastAndroid.show("Invalide selected date  ", ToastAndroid.SHORT); 
         setStartDate('');
          setEndDate('');
    }
  //  const start = startDate ? moment(startDate).format("MM/DD/YYYY") : "Not Selected";
       
  }

  const btnCloseOnpress=()=>{
    setShowCalendar(!showCalendar);
    setStartDate('');
    setEndDate('');
}

  ////////////////////////end==============================

  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: modalStyle,
          backgroundColor: '#fff',
          zIndex: 20,
          borderRadius: 10,
          elevation: 20,
          paddingTop: 10,
          paddingBottom: 20,
          marginLeft: 0,
          ...Platform.select({
            ios: {
              paddingTop: 50,
            },
          }),
        }}>
        <View style={style.modalCont}>
          {/* ........................................ meter reading modal start.......................................... */}

          <View style={styles.modalMainContainer}>
            <View style={styles.modalSubContainer}>
              <IconA name="location-outline" size={20} />
              <Text style={styles.modalRegularTitle}>Location: </Text>
              <Text style={styles.modalTitle}>Colombo 05</Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <IconA name="time-outline" size={20} />
              <Text style={styles.modalRegularTitle}>Time: </Text>
              <Text style={styles.modalTitle}>
                {moment().utcOffset('+05:30').format(' hh:mm a')}
              </Text>
            </View>

            <View style={styles.modalSubContainer}>
              <Text style={styles.modalRegularTitle}>Last Reading Value: </Text>
              <Text style={styles.modalTitle}>{lastMeterReadervalue}</Text>
            </View>

            <View style={styles.modalMainContainer}>
              <Text
                style={{
                  fontFamily: comStyles.FONT_FAMILY.BOLD,
                  color: comStyles.COLORS.HEADER_BLACK,
                  fontSize: 15,
                  marginTop: 10,
                }}>
                Add the meter you are day
              </Text>
            </View>

            <ScrollView style={style.scrollStyle} nestedScrollEnabled={true}>
            <InputText
              style={styles.inputTextStyle}
              placeholder="125KM"
              //onKeyPress={keyPress => console.log(keyPress)}
              onFocus={() => validateDayendvalue()}
              stateValue={meterValue}
              keyType="numeric"
              max={4}
              setState={meterValue => setMeterValue(meterValue)}
            />
            <InputText
              style={styles.inputTextStyle}
              placeholder="Enter Remark"
              stateValue={remark}
              max={5}
              setState={remark => setremark(remark)}
            />

            <Text style={styles.subtxt}>OR</Text>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Text style={styles.modalTitle}>
                Update the photo of the meter
              </Text>
              <Text style={styles.modalTitle}>time you are </Text>
            </View>

            <View style={styles.txtUpload}>
              {image ? (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: comStyles.FONT_FAMILY.BOLD,
                      color: comStyles.COLORS.ORANGE,
                      fontSize: 18,
                      marginRight: 5,
                    }}>
                    Image Uploaded
                  </Text>
                  <IconA
                    name="ios-checkmark-circle"
                    size={20}
                    color={comStyles.COLORS.LOW_BUTTON_GREEN}
                    style={{marginRight: 5}}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => openCamera()}>
                  <IconA
                    name="cloud-upload"
                    size={20}
                    color={comStyles.COLORS.ICON_BLUE}
                    style={{marginRight: 5}}
                  />
                  <Text
                    style={{
                      fontFamily: comStyles.FONT_FAMILY.BOLD,
                      color: comStyles.COLORS.ICON_BLUE,
                      fontSize: 18,
                      marginRight: 5,
                    }}>
                    Photo of Meter*
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <ActionButton
              title={attendance_savebutton}
              style={styles.ActionButton}
              // onPress={() => validateDayendvalue()}
              onPress={() => newValidateDayendvalue()}
            />

            <ActionButton
              title="Cancel"
              style={styles.ActionButton}
              onPress={() => slideOutModal()}
            />
          </ScrollView>
          </View>

          {/* ........................................ meter reading modal end.......................................... */}
        </View>
      </Animated.View>

      <Header
        isBtn={true}
        title="Attendance"
        btnOnPress={() => navigation.goBack()}
      />

      <View style={ComponentsStyles.CONTENT}>
        <View style={style.container}>
          <ActionButton
            title="Last 7 Days"
            onPress={handale7days}
            style={
              first7days === true ? style.selectedbutton : style.defaultbutton
            }
            textStyle={
              first7days === true
                ? style.selectedBUTTON_TEXT
                : style.defaultBUTTON_TEXT
            }
          />

          <ActionButton
            title="Last 30 Days"
            onPress={handle30days}
            style={
              first30dayse === true ? style.selectedbutton : style.defaultbutton
            }
            textStyle={
              first30dayse === true
                ? style.selectedBUTTON_TEXT
                : style.defaultBUTTON_TEXT
            }
          />
          <ActionButton
            title="Custom"
            onPress={btnCloseOnpress}
            style={
              customdays === true ? style.selectedbutton : style.defaultbutton
            }
            textStyle={
              customdays === true
                ? style.selectedBUTTON_TEXT
                : style.defaultBUTTON_TEXT
            }
          />
        </View>
        {showCalendar && (
               <View style={{alignContent:'center', justifyContent: 'center',alignItems:'center'}}>
              
                   <CalendarPicker
                   onDateChange={handleDateChange}
                   selectedStartDate={startDate}
                   selectedEndDate={endDate}
                   />
               </View>
               )}
        <View style={style.detaislContainer}>
          <View style={style.detaislsubContainer}>
            <Text style={style.detaisSubText}>Total Working Hours</Text>
            <Text style={style.detaisMainText}>{totalTimeDifference}</Text>
          </View>
          <View style={style.detaislsubContainer}>
            <Text style={style.detaisSubText}>Total Over Time</Text>
            <Text style={style.detaisMainText}>{overtimeSum}</Text>
          </View>
        </View>

        <View style={style.detaislContainer1}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={HandleAttendanceDetails}>
              <Text
                style={
                  attendanceDetails1 === true
                    ? style.AttendanceDetailspress
                    : style.AttendanceDetails
                }>
                Attendance Details
              </Text>
            </TouchableOpacity>
            <View
              style={
                attendanceDetails1 === true
                  ? style.bottomViewleft2
                  : style.bottomViewleft1
              }
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={handleRemak}>
              <Text
                style={
                  remarks === true
                    ? style.AttendanceDetailspress
                    : style.AttendanceDetails
                }>
                In/Out Remarks
              </Text>
            </TouchableOpacity>
            <View
              style={
                remarks === true
                  ? style.bottomViewright2
                  : style.bottomViewright1
              }
            />
          </View>
        </View>
        <LeftRightArrowbarComponent
          customestyle={Style.arrowbar}
          leftarrow="leftcircle"
          rightarrow="rightcircle"
        />

        {/* <ScrollView directionalLockEnabled={false} horizontal={true}> */}
        <View style={{height: 35}}>
          {attendanceDetails1 ? (
            <AttendanceTableHeaderComponent
              isHeadertitle1={true}
              Headertitle1="Date"
              isHeadertitle2={true}
              Headertitle2="Shift"
              isHeadertitle3={true}
              Headertitle3="In/OutTime"
              isHeadertitle4={false}
              Headertitle4=""
              isHeadertitle5={false}
              Headertitle5="Tot Work Hours"
              isHeadertitle6={false}
              Headertitle6="Overtime"
              customstyle={undefined}
            />
          ) : (
            <AttendanceTableHeaderComponent
              isHeadertitle1={true}
              Headertitle1="Date"
              isHeadertitle2={true}
              Headertitle2="In/OutRemark"
              isHeadertitle3={false}
              Headertitle3="OutRemark"
              isHeadertitle4={false}
              Headertitle4="OutTime"
              isHeadertitle5={false}
              Headertitle5="TotHours"
              isHeadertitle6={false}
              Headertitle6="Overtime"
              customstyle={undefined}
            />
          )}
        </View>
        {/* <ScrollView>

                    {listdata.filter((a) => filterRegex.test(a.date))
                        .map((item, index) => {
                            return (
                                <AttendanceTableDetailsComponent
                                    isHeadertitle1={true}
                                    Headertitle1={item.date}
                                    isHeadertitle2={true}
                                    Headertitle2={item.shift}
                                    isHeadertitle3={true}
                                    Headertitle3={item.shift}
                                    isHeadertitle4={true}
                                    Headertitle4={item.outtime}
                                    isHeadertitle5={true}
                                    Headertitle5={item.twhour}
                                />
                            )
                        }
                        )
                    }

                </ScrollView> */}
        {/* {attendanceDetails1 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
            // data={AttendanceDetails}
            data={listdata}
            style={{marginTop: 10, marginBottom: 60}}
            horizontal={false}
            renderItem={({item}) => {
              return (
                <AttendanceTableDetailsComponent
                  isHeadertitle1={true}
                  Headertitle1={item.date}
                  isHeadertitle2={true}
                  Headertitle2={item.shift}
                  isHeadertitle3={true}
                  Headertitle3={item.intime}
                  isHeadertitle4={false}
                  Headertitle4={item.outtime}
                  isHeadertitle5={false}
                  Headertitle5={item.twhour}
                  isHeadertitle6={false}
                  Headertitle6={item.overtime}
                />
              );
            }}
            keyExtractor={item => `${item.id}`}
          />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
            data={listdata}
            style={{marginTop: 10, marginBottom: 60}}
            horizontal={false}
            renderItem={({item}) => {
              return (
                <AttendanceTableDetailsComponent
                  isHeadertitle1={true}
                  Headertitle1={item.date}
                  isHeadertitle2={true}
                  Headertitle2={item.inremark}
                  isHeadertitle3={false}
                  Headertitle3={item.outremark}
                  isHeadertitle4={false}
                  Headertitle4={item.outtime}
                  isHeadertitle5={false}
                  Headertitle5={item.twhour}
                  isHeadertitle6={false}
                  Headertitle6={item.overtime}
                />
              );
            }}
            keyExtractor={item => `${item.id}`}
          />
        )} */}
        {/* </ScrollView> */}

        <ActionButton
          title={actionButonHeading}
          style={{marginBottom: 70}}
          is_icon={true}
          icon_name="diff-added"
          onPress={() => slideInModal()}
          iconColor={ComponentsStyles.COLORS.WHITE}
        />
      </View>
    </SafeAreaView>
  );
};
export default AttendanceScreen;

const styles = StyleSheet.create({
  modalMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 2,
  },

  modalRegularTitle: {
    fontFamily: comStyles.FONT_FAMILY.REGULAR,
    color: comStyles.COLORS.HEADER_BLACK,
    fontSize: 15,
    marginRight: 5,
  },

  modalTitle: {
    fontFamily: comStyles.FONT_FAMILY.BOLD,
    color: comStyles.COLORS.HEADER_BLACK,
    fontSize: 15,
  },
  txtUpload: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderStyle: 'dashed',
    width: '100%',
    marginTop: 25,
  },
  subtxt: {
    color: comStyles.COLORS.BLACK,
    fontSize: 13,
    fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
    marginBottom: 10,
  },
  ActionButton: {
    marginTop: 20,
    marginBottom: 5,
  },

  inputTextStyle: {
    borderWidth: 0,
    paddingLeft: 0,
    marginLeft: 0,
    width: '100%',
    fontSize: 20,
    fontFamily: comStyles.FONT_FAMILY.BOLD,
    color: comStyles.COLORS.HEADER_BLACK,
    borderBottomWidth: 0.5,
    borderColor: comStyles.COLORS.HEADER_BLACK,
    borderStyle: 'dashed',
    textAlign: 'center',
    margin: 5,
    borderRadius: 0,
  },
  scrollStyle: {
    marginBottom: 0,
    marginLeft: 13,
    marginRight: 13,
},
});
