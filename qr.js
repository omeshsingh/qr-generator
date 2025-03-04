const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      showScanner();
      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector("canvas").toDataURL();
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
    clearUI(); // Ensure the UI is cleared before generating a new QR code
    
    const qrcode = new QRCode(qr, {
      text: url,
      width: size,
      height: size,
    });
  
    // Wait for the QR code to be generated
    setTimeout(() => {
      const qrCanvas = qr.querySelector("canvas");
      if (qrCanvas) {
        const saveUrl = qrCanvas.toDataURL("image/png");
        createSaveBtn(saveUrl);
      }
    }, 500); // Give some time for the QR code to render
  };
  

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// hide  scanner
const showScanner = () => {
  const scanner = document.getElementById("qrCodeContainer");
  scanner.style.display = "block";
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download qr code as image
const createSaveBtn = (saveUrl) => {
    const link = document.createElement("a");
    link.id = "save-link";
    link.className =
      "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/3 m-auto my-5 block text-center";
    link.innerHTML = "Save Image";
  
    link.href = saveUrl;
    link.download = "qrcode.png";
  
    document.getElementById("generated").appendChild(link);
  };
  

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);