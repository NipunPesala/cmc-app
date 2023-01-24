/**
* @author Gagana Lakruwan
*/
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Animated,
    Keyboard,
    Platform,
    ToastAndroid,
    Alert,
} from "react-native";
import { cleanSingle } from "react-native-image-crop-picker";
import ActionButton from "../../../Components/ActionButton";
import AddAdditionalSpareParts from "../../../Components/AddAdditionalSpareParts";
import AddSparePartsComponent from "../../../Components/AddSparePartsComponent";
import CompleteTicket from "../../../Components/CompleteTicket";
import Expences from "../../../Components/Expences";
import Header from "../../../Components/Header";
import Locations from "../../../Components/Locations";
import MoreInfo from "../../../Components/MoreInfo";
import RequestBottomSheet from "../../../Components/RequestBottomSheet";
import ServiceCustomerDetails from "../../../Components/ServiceCustomerDetails";
import ServiceHistory from "../../../Components/ServiceHistory";
import SpareParts from "../../../Components/SpareParts";
import TicketDocuments from "../../../Components/TicketDocuments";
import TicketMoreInfo from "../../../Components/TicketMoreInfo";
import Tickets from "../../../Components/Tickets";
import TicketsHistory from "../../../Components/TicketsHistory";
import AsyncStorageConstants from "../../../Constant/AsyncStorageConstants";
import { getCurrentServiceCallID } from "../../../Constant/AsynStorageFuntion";
import ComStyles from "../../../Constant/Components.styles";
import { getServiceById } from "../../../SQLiteDatabaseAction/DBControllers/ServiceController";
import { getSparePartsAllData } from "../../../SQLiteDatabaseAction/DBControllers/SparePartsController";
import { getTicketById, updateTicketAttendStatus, updateTicketStatus } from "../../../SQLiteDatabaseAction/DBControllers/TicketController";
import style from "./style";

let height = Dimensions.get("screen").height;

const TicketDetails = (props: any) => {

    const {
        navigation, route
    } = props;

    const [loadScreen, setLoadScreen] = useState('moreInfo');
    const [isServiceActive, setIsServiceActive] = useState(true);
    // const navigation = useNavigation();
    const [ticketID, setTicketID] = useState('');
    const [isShowSweep, setIsShowSweep] = useState(true);
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [isSparepart, setIsSparepart] = useState(true);
    const [isAdditional, setIsAdditional] = useState(true);
    const [customer, setCustomer] = useState('');
    const [status, setStatus] = useState('');
    const [technician, setTechnician] = useState('');
    const [location, setLocation] = useState('');
    const [contact_no, setContactNo] = useState('');
    const [serviceCall_ID, setServiceCall_ID] = useState('');
    const [callDetailList, setCallDetailList]: any[] = useState([]);
    const [SparePartList, setSparePartList]: any[] = useState([]);

    const selection = (screen: string) => {
        if (screen == "ticket") {
            setLoadScreen(screen);
        } else if (screen == "location") {
            setLoadScreen(screen);
        } else if (screen == "serviceH") {
            setLoadScreen(screen);
        } else {
            setLoadScreen(screen);
        }
    }

    const getServiceCallDetails = (SID: any) => {

        console.log("service id of ticket id ....... ********** ", SID);

        getServiceById(SID, (result: any) => {

            setCallDetailList(result);

            console.log(result,"   call details ..........   " , callDetailList);
            

        });


    }

    const getSpareParts = () => {
        getSparePartsAllData((result: any) => {
            setSparePartList(result);

          

            console.log(" Spare Parts  ................  " , result );
            
        });
    }
    

    const enableService = (ticket_id: any) => {

        if (!isServiceActive) {
            // ToastAndroid.show("Ticket Completed ", ToastAndroid.SHORT);
            navigation.navigate("CompleteTicket")
        } else {
            
            setIsServiceActive(!isServiceActive);
            console.log(isServiceActive);

            updateTicketAttendStatus(ticket_id, 1, (result: any) => {

                if (result === "success") {

                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, ticket_id);

                    ToastAndroid.show("Ticket Started ", ToastAndroid.SHORT);

                } else {

                    Alert.alert(
                        "Failed...!",
                        "Ticket Start Failed.",
                        [
                            {
                                text: "OK", onPress: () => {

                                }
                            }
                        ]
                    );

                }

            });
        }


    }

    const getTicketDetails = (ticketId: any) => {

        // console.log("TICKET ID ,,,,,,,,,, ", ticketId);


        getTicketById(ticketId, (result: any) => {




            for (let i = 0; i < result.length; ++i) {

                console.log(result[i].attend_status);
                setCustomer(result[i].customer);
                setTechnician(result[i].assignTo);
                setLocation(result[i].customer_address);
                setContactNo(result[i].contact_no);
                setServiceCall_ID(result[i].serviceId);

                // console.log("^^^^^^^^^^^^^^^^^^^^^^^    "  , result[i].serviceId,   " ...........  " ,serviceCall_ID);

                getServiceCallDetails(result[i].serviceId);



                if (result[i].attend_status === "0") {

                    setStatus("Open");
                    setIsServiceActive(true);

                } else if (result[i].attend_status === "1") {

                    setStatus("Pending");
                    setIsServiceActive(false);

                } else if (result[i].attend_status === "2") {

                    setStatus("Hold");
                    setIsServiceActive(true);

                } else if (result[i].attend_status === "3") {
                    setStatus("Completed");
                    setIsServiceActive(false);
                }

            }

        });

        // updateTicketStatus(ticketId,1,(result:any) =>{



        // })
    }

    const slideInModal = () => {
        setIsShowSweep(false);
        console.log('sampleIn');
        Animated.timing(modalStyle, {
            toValue: height / 8,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };
    //#endregion

    //#region SlideOutModal

    const slideOutModal = () => {

        console.log('out');
        setIsShowSweep(true);
        Keyboard.dismiss();
        Animated.timing(modalStyle, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
       
             if( route.params.tab == 'Expences'){

                selection("documents");

             }
            setTicketID(route.params.ticketID);
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, route.params.ticketID);
            getTicketDetails(route.params.ticketID);
            getSpareParts();

    }, [])


    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
        
             if( route.params.tab == 'Expences'){

                selection("documents");

             }
            setTicketID(route.params.ticketID);
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, route.params.ticketID);
            getTicketDetails(route.params.ticketID);
            getSpareParts();

        });
        return focusHandler;
    }, [navigation])


    return (
        <SafeAreaView style={ComStyles.CONTAINER}>

            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    top: modalStyle,
                    backgroundColor: '#fff',
                    zIndex: 20,
                    borderRadius: 10,
                    elevation: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginLeft: 0,
                    ...Platform.select({
                        ios: {
                            paddingTop: 50
                        }
                    })
                }}>
                <View style={style.modalCont}>

                    {isSparepart ?
                        <RequestBottomSheet
                            onpressicon={() => slideOutModal()}
                            addAdditional={() => setIsAdditional(false)}
                            addOnpress={() => setIsSparepart(false)}
                        />
                        :
                        <AddSparePartsComponent
                            onpressicon={() => slideOutModal()}
                            onpress={() => setIsSparepart(true)}
                        />


                    }

                    {/* <CompleteTicket
                        onpressicon={() => slideOutModal()}
                    /> */}

                    {/* {isAdditional ?

                        <RequestBottomSheet
                            onpressicon={() => slideOutModal()}
                            addAdditional={() => setIsAdditional(false)}
                            addOnpress={() => setIsSparepart(false)}
                        />
                        :

                        <AddAdditionalSpareParts
                            onpressicon={() => slideOutModal()}
                            onpress={() => setIsAdditional(true)}
                        />
                    } */}

                </View>
            </Animated.View>


            <Header title="Tickets Details" isBtn={true} btnOnPress={() => navigation.goBack()} />
            <View style={ComStyles.CONTENT}>
                <View style={{ padding: 10 }} />
                <ServiceCustomerDetails
                    customer={customer}
                    reqNo={ticketID}
                    isService={false}
                    contactPerson={technician}
                    contactNo={contact_no}
                    location={location}
                    status={status}
                    btnTite={isServiceActive ? "Start Ticket" : "Complete Tickets"}
                    onPress={() => { enableService(ticketID) }}
                    typeNo="Ticket No"
                    btnStyle={!isServiceActive ? { backgroundColor: ComStyles.COLORS.LOW_BUTTON_GREEN } : ""} />

                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <ActionButton title="More Info"
                        style={loadScreen == "moreInfo" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "moreInfo" ? style.activeText : style.deActiveText}
                        onPress={() => selection("moreInfo")} />

                    <ActionButton title="Spare Parts"
                        style={loadScreen == "spareparts" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "spareparts" ? style.activeText : style.deActiveText}
                        onPress={() => selection("spareparts")} />

                    <ActionButton title="Service History"
                        style={loadScreen == "serviceH" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "serviceH" ? style.activeText : style.deActiveText}
                        onPress={() => selection("serviceH")} />

                    <ActionButton title="Expences"
                        style={loadScreen == "documents" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "documents" ? style.activeText : style.deActiveText}
                        onPress={() => selection("documents")} />
                </View>

                <View style={{ flex: 1 }}>
                    {
                        loadScreen == "moreInfo" ?
                        <MoreInfo />
                            // <TicketMoreInfo serviceCallDEtails={callDetailList} />
                            :
                            loadScreen == "spareparts" ?
                                <SpareParts
                                sparePartList={SparePartList}
                                isActive={isServiceActive}
                                ticketID={ticketID}

                                />

                                :
                                loadScreen == "serviceH" ?
                                    <TicketsHistory />
                                    :
                                    <Expences 
                                    isActive={isServiceActive}/>

                    }

                </View>
            </View>
        </SafeAreaView>
    );
}
export default TicketDetails;


const styles = StyleSheet.create({
    container: {}
});