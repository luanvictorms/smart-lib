Plugin
https://ionicframework.com/docs/v3/native/ble/

1. Conexão:
this.ble.connect(<mac_leitor>).subscribe( peripheralData => {

2. Guardo esses dois valores:
let serviceBle = JSON.stringify(peripheralData.characteristics[15].service).replace(/[\\"]/g, '')
let charactBle = JSON.stringify(peripheralData.characteristics[15].characteristic).replace(/[\\"]/g, '')

3. Crio esse array, que trata-se de alguns parametros, tal como a potência:
let dataBuffer = new Uint8Array(7);
dataBuffer[0]  = 0x06;
dataBuffer[1]  = 0x00;
dataBuffer[2]  = 0x01;
dataBuffer[3]  = 0x04; //QValue   1~15
dataBuffer[4]  = 0x00; //Session  0~3
dataBuffer[5]  = 0xAC;
dataBuffer[6]  = 0x36;

4. Envio envio esse valor e então passo a receber as leituras:
this.ble2.write(<mac_leitor>, serviceBle, charactBle, dataBuffer.buffer)

5. Recebendo as leituras, atráves dessa função do plugin:
this.ble.startNotification(this.leitor_serial, serviceBle, charactBle).subscribe(notificationData => {

6. Realizo algumas tratativas para reconhecer e formatar a tag, basicamente inicio dessa forma:
let notBuffer = new Uint8Array(notificationData);
let str      += this.toHexString(notBuffer);
		