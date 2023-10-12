import qrcode

data = '4bb209ef89fbc9cd69c74a39acf044ecec1b01257c60bea2d06c114db0df3742'

img = qrcode.make(data)

img.save('imgQr/qr.png')