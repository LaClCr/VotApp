import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import ScreensContext from '../projectView/projectViewScreensContext'; // Asegúrate de que la ruta sea correcta

const QRReader = () => {
    const { setProjectName } = useContext(ScreensContext);
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
        console.log(data);
        if (data) {
            setProjectName(data); // Actualiza el nombre del proyecto en el contexto
            navigation.navigate("ProjectDetails"); // Navega a ProjectDetails
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
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
                <View style={styles.scanBar} />
            </Camera>
            {scanned && (
                <View style={styles.sectionButton}>
                    <Button
                        onPress={() => setScanned(false)}
                        title="Escanear de nuevo"
                        color="#C02830" />
                </View>
            )}
        </View>
    );
};

export default QRReader;

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
        elevation: 5,
        justifyContent: 'center',
        backgroundColor: '#C02830',
    },
});
