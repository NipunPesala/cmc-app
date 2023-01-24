/**
* @author Gagana Lakruwan
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import ComponentsStyles from "../Constant/Components.styles";
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from "./ActionButton";

type ParamTypes = {
    ticketNo: string;
    name?: string;
    address?: string;
    status?: string;
    statusStyle: any,
    isIcon: boolean,
    isanyIcon: boolean,
    isbtn: boolean,
    isUpdate: boolean,
    onPressIcon: Function,
    onPressCancelIcon: Function,
    onPresBtn: Function,
    onPresBtnupdate: Function,
    enableStatus: boolean,
    enableStatusUpdate: boolean,
    headerType: string,
    date: any,
    ticketError: string,
    createdBy: string,
    serviceTicketID: string,
    value1: string,
    value2: string,
    isCreatedBy: boolean;
    isserviceTicketID: boolean,
    nameAddress: boolean,
    headerStyle: any,
    btnTitle: string,
    value: boolean,
    txtvalue: string,
    anyIconName: string,
    iconColor: string,
    ticketStatus: string,
    isCusAddress: boolean,
    addressheader: string,
    value3: string,
}

const ListBox = ({ ticketNo, iconColor, anyIconName, value, txtvalue, btnTitle,isCusAddress,addressheader, value3,onPressCancelIcon, onPresBtnupdate, nameAddress, isCreatedBy, isserviceTicketID, isanyIcon, createdBy, serviceTicketID, value1, value2, name, address, status, statusStyle, isIcon, isbtn, onPresBtn, onPressIcon, enableStatus, headerType, date, ticketError, headerStyle, isUpdate, ticketStatus, enableStatusUpdate }: ParamTypes) => {
    return (
        <View style={[styles.container, headerStyle]}>
            <View style={{ backgroundColor: 'white', flex: 4, justifyContent: "center" }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{headerType}</Text>
                    <Text style={styles.headerText}>{ticketNo}</Text>
                </View>

                {
                    isCreatedBy ?
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.subHeaderText}>{createdBy}</Text>
                            <Text style={styles.customerText}>{value1}</Text>
                        </View>
                        : <></>
                }
                {
                    isserviceTicketID ?
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.subHeaderText}>{serviceTicketID}</Text>
                            <Text style={styles.customerText}>{value2}</Text>
                        </View>
                        : <></>
                }

                {
                    isCusAddress ?
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.subHeaderText}>{addressheader}</Text>
                            <Text style={styles.customerText}>{value3}</Text>
                        </View>
                        : <></>
                }

                {date ?
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.customerText}>{date}</Text>
                    </View>
                    : <></>
                }
                {value ?
                    <View style={{ marginTop: 5, }} >
                        <Text style={styles.txtValue}>{txtvalue}</Text>
                    </View>
                    : <></>
                }
                {ticketError ?
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.ticketName}>{ticketError}</Text>
                    </View>
                    : <></>
                }
                {nameAddress ?

                    <View style={{ marginTop: 5, }}>
                        <Text style={styles.customerText}>{name}</Text>
                        <Text style={styles.customerText}>{address}</Text>
                        <Text style={styles.customerText2}>{ticketStatus}</Text>
                    </View>
                    : <></>

                }


                {
                    status == "high" || status == "High" ?
                        <View style={[styles.statusH, statusStyle]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                        : <></>
                }
                {
                    status == "medium" || status == "Medium" ?
                        <View style={[styles.statusM, statusStyle]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                        : <></>
                }
                {
                    status == "low" || status == "Low" ?
                        <View style={[styles.statusL, statusStyle]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                        : <></>
                }


            </View>
            <View style={{ flexDirection: 'column' }}>
                {
                    isIcon ?
                        <TouchableOpacity style={styles.iconView} onPress={onPressIcon}>
                            <IconMC name='login' size={35} color={ComponentsStyles.COLORS.ICON_BLUE} iconStyle={styles.iconStyle} />
                        </TouchableOpacity>
                        : <></>
                }
                {
                    isbtn ?
                        <View style={styles.btnView} >
                            <ActionButton title={btnTitle} onPress={onPresBtn} disabled={enableStatus} textStyle={{ fontSize: 10 }} style={enableStatus ? { backgroundColor: ComponentsStyles.COLORS.PROCEED_ASH, } : ""} />
                        </View>
                        : <></>
                }{
                    isUpdate ?
                        <View style={styles.btnView} >
                            <ActionButton title="Update" onPress={onPresBtnupdate} disabled={enableStatusUpdate} textStyle={{ fontSize: 10 }} style={enableStatusUpdate ? { backgroundColor: ComponentsStyles.COLORS.PROCEED_ASH, } : { backgroundColor: ComponentsStyles.COLORS.ORANGE, }} />
                        </View>
                        : <></>
                }
                {
                    isanyIcon ?
                        <TouchableOpacity style={styles.iconView} onPress={onPressCancelIcon}>
                            <IconMC name={anyIconName} size={25} color={iconColor} iconStyle={styles.iconStyle} />
                        </TouchableOpacity>
                        : <></>
                }
            </View>

        </View >
    );
}
export default ListBox;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        shadowColor: "#000",
        padding: 7,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    header: {
        flexDirection: 'row'
    },
    headerText: {
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 14
    },
    subHeaderText: {
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 11
    },
    iconStyle: {
        width: 50,
        height: 70,
    },
    statusH: {
        width: 40,
        bottom: 0,
        backgroundColor: ComponentsStyles.COLORS.HIGH_BUTTON_RED,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    statusM: {
        width: 70,
        bottom: 1,
        backgroundColor: ComponentsStyles.COLORS.MEDIUM_BUTTON_YELLOW,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    statusL: {
        width: 40,
        bottom: 1,
        backgroundColor: ComponentsStyles.COLORS.LOW_BUTTON_GREEN,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    customerText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
        color: ComponentsStyles.COLORS.SERVICE_DETAILS_BLACK,
        fontSize: 10,
    },
    customerText2: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        color: ComponentsStyles.COLORS.LOW_BUTTON_GREEN,
        fontSize: 11,
    },
    statusText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 10,
        color: 'white',
        alignSelf: 'center'
    },
    iconView: {
        backgroundColor: 'white',
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ticketName: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 10,
        color: ComponentsStyles.COLORS.HEADER_BLACK
    },
    dateText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: ComponentsStyles.COLORS.HEADER_BLACK
    },
    txtValue: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: ComponentsStyles.COLORS.HEADER_BLACK
    }
});