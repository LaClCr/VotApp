import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropdownComponent = ({ data, onChange }) => {
    const [value, setValue] = useState(null);

    const renderItem = (item) => {
        return (
            <View
                style={
                    styles.item
                }
            >
                <Text style={styles.textItem}>
                    {item.label}
                </Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        name="checkcircle"
                        size={20}
                    />
                )}
            </View>
        );
    };

    const handleSelect = (item) => {
        if (item.value !== value) {
            setValue(item.value);
            onChange(item.value);
        }
    };
    return (
        <Dropdown
            style={
                styles.dropdown
            }
            placeholderStyle={[
                styles.placeholderStyle,
                
            ]}
            selectedTextStyle={[
                styles.selectedTextStyle,
            ]}
            inputSearchStyle={[
                styles.inputSearchStyle,
            ]}
            iconStyle={styles.iconStyle}
            data={data}
            search={false}
            activeColor="#B58933"
            maxHeight={400}
            labelField="label"
            valueField="value"
            placeholder="Degree"
            searchPlaceholder="Search"
            value={value}
            onChange={(item) => handleSelect(item)}
            renderLeftIcon={() => (
                <AntDesign
                    style={styles.icon}
                    name="book"
                    size={20}
                />
            )}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        flex: 0.5,
        margin: 16,
        height: 60,
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        backgroundColor: "white",
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
export default DropdownComponent;
