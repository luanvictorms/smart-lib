BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
// Success code
console.log("Connected peripherals: " + peripheralsArray.length);
});


https://github.com/innoveit/react-native-ble-manager
https://stackoverflow.com/questions/68361333/reactnative-ble-manager-is-not-reading-data-from-peripheral-on-ios
error => [BleError: Device is not authorized to use BluetoothLE]
https://github.com/dotintent/react-native-ble-plx/issues/248


## Limpar Cache

    cd android && ./gradlew clean && ./gradlew :app:bundleRelease
    react-native start --reset-cache