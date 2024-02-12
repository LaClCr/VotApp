import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import ScreensContext from "./projectViewScreensContext";

const ScannerIDCard = () => {

    const { nieValoration, setNieValoration } = useContext(ScreensContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        if (data.length === 9) {
            setNieValoration(data);
            navigation.navigate('ProjectValoration');
        } else {
            let nieRegex = /TITLE:(.*?)\.png/;
            let match = nieRegex.exec(data);

            if (match) {
                setNieValoration(match[1]);
                navigation.navigate('ProjectValoration');
            }
        }
    };

    if (hasPermission === null) {
        return <Text>Solicitando permiso para acceder a la cámara...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No se ha concedido acceso a la cámara</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
                <View style={styles.scanBar} />
            </Camera>
            {scanned && (
                <Button
                    title={'Escanear de nuevo'}
                    onPress={() => setScanned(false)}
                />
            )}
        </View>
    );
};

export default ScannerIDCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    scanBar: {
        width: '100%',
        height: 2,
        backgroundColor: 'red',
    },
});