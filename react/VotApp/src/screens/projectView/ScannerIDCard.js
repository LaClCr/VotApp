import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import ScreensContext from "./projectViewScreensContext";
import { useTranslation } from 'react-i18next';

const ScannerIDCard = () => {

    const { setNieValoration } = useContext(ScreensContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();
    const { t } = useTranslation();

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
        return <Text>{t("Solicitando permiso para acceder a la cámara...")}</Text>;
    }
    if (hasPermission === false) {
        return <Text>{t("No se ha concedido acceso a la cámara")}</Text>;
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
                <View style={styles.sectionButton}>
                    <Button
                        onPress={() => setScanned(false)}
                        mode="contained"
                        buttonColor="#C02830">Escanear de nuevo</Button>
                </View>
            )}
            <View style={styles.sectionButton}>
                <Button
                    onPress={() => navigation.navigate('NIEManual')}
                    icon="pen"
                    mode="contained"
                    buttonColor='white'
                    textColor='#C02830'
                >Introducir manualmente</Button>
            </View>
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
    sectionButton: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#C02830',
    },
});