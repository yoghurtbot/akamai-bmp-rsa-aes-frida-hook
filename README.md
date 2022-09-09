
# Akamai BMP - RSA Public Key Frida Hook
This Frida script can be used to find the public RSA key used in the encryption process in Akamai BMP 3.3.0.


## How to use the script
> This script was tested on an Android ARM device. You will need to adjust the memory addresses for any other architectures. 

> This script assumes that you have already setup rooted and setup Frida on your Android device

`frida -l "D:\akamai-bmp-rsa-hook.js" -f  com.ihg.apps.android -U`

## Output
Below is an example of the output from the script.

![enter image description here](https://i.imgur.com/G0IWw1r.png)

## Finding the memory address of RSAEncrypt

 1. Unzip an APK that uses Akamai BMP 3.3.0
 2. Load the `libakamaibmp.so` file from `/lib/arm64-v8a` (if using an ARM device, if not, select the correct file for your architecture) in Ghidra
 3. Search for `RSAEncrypt` in the Symbol Tree
 4. Replace the memory address in the script (variable `rsaEncryptAddr`) with the one highlighted in the screenshot
 5. Ensure the base image address is correct by clicking; Window -> Memory Map -> Set Image Base. If it is different, replace the correct value in the Frida script (`ghidraImageBase`)

![enter image description here](https://i.imgur.com/TPvy6RB.png)
