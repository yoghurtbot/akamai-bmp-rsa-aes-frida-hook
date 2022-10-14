
# Akamai BMP - RSA/AES Frida Hook
This Frida script can be used to find the public RSA key used in the encryption process in Akamai BMP 3.3.0. Since version 3.3.0, Akamai uses a shared library to handle the encryption process, rather than in Java.

It can also be used to inspect the sensor data before it goes through the AES-CBC-128 encryption routine.

The public key is encrypted inside the shared library, and a function called `rotate_string` decrypts it into the public key. This Frida scripts hooks into a function called `Crypto::RSAEncrypt` that takes the clear text RSA key as a parameter, and dumps it out.

![](https://i.imgur.com/7z8RQlU.png)

## How to use the script
This script assumes that you have already rooted and installed Frida on your Android device.
```console
$ frida -l "D:\akamai-bmp-rsa-hook.js" -f com.ihg.apps.android -U --no-pause
```

## Output
Below is an example of the output from the script (*screenshot purposly cropped to stop you being lazy...*)

![output](https://i.imgur.com/FpmV2fm.png)
