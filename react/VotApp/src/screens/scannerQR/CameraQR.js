import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function QRReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Código QR con valor ${data} ha sido escaneado!`);
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
}

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


/*
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import ScreensContext from '../projectView/projectViewScreensContext';

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
            setProjectName(data);
            navigation.navigate("ProjectDetails");
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
                <View style={styles.sectionButton}>
                    <Button
                        onPress={() => setScanned(false)}
                        mode="contained"
                        buttonColor="#C02830">Escanear de nuevo</Button>
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
*/