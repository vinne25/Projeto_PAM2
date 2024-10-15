import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(true); // Estado para mostrar ou ocultar a câmera

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted ainda.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function exitCamera() {
    setShowCamera(false); // Função para ocultar a câmera
  }

  function returnToCamera() {
    setShowCamera(true); // Função para voltar para a câmera
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
          <TouchableOpacity style={styles.exitButton} onPress={exitCamera}>
            <Text style={styles.exitButtonText}>Sair da Câmera</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.closedMessage}>Câmera fechada</Text>
          <TouchableOpacity style={styles.returnButton} onPress={returnToCamera}>
            <Text style={styles.returnButtonText}>Voltar para a Câmera</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  exitButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 50,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedMessage: {
    fontSize: 20,
    marginBottom: 20,
  },
  returnButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  returnButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});