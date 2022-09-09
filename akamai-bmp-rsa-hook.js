function processJniOnLoad(libraryName) {
	const rsaEncryptAddr = 0x001a4258; //Address of the RSAEncrypt method, as found in Ghidra
	const ghidraImageBase = 0x00100000; //Base image address

	//Find the memory address of the bmp library
    	const membase = Module.findBaseAddress(libraryName);
    	console.log("[+] Base address is " + membase);
	
	//Find the actual address by subtracting the image base
	const actualRsaEncryptAddress = membase.add(rsaEncryptAddr - ghidraImageBase);
    	console.log("[+] Actual RSAEncrypt Address " + actualRsaEncryptAddress);

	Interceptor.attach(actualRsaEncryptAddress, {
		onEnter: function(args) {
			console.log("Hooked RSAEncrypt");
			const rsaPublicKey = Memory.readUtf8String(args[0]); //public key is the first arg, and is type uchar *
			console.log(rsaPublicKey);
		},
		onLeave: function(retval) {
			console.log("Leaving RSAEncrypt");
		}
	});
}

function waitForLibLoading(libraryName) {
    var isLibLoaded = false;

    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
        onEnter: function (args) {
            var libraryPath = Memory.readCString(args[0]);
            if (libraryPath.includes(libraryName)) {
                console.log("[+] Loading library " + libraryPath + "...");
                isLibLoaded = true;
            }
        },
        onLeave: function (args) {
            if (isLibLoaded) {
                processJniOnLoad(libraryName);
                isLibLoaded = false;
            }
        }
    });
}

waitForLibLoading("libakamaibmp.so");
