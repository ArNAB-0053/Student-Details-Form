const firebaseConfig = {
    // Copy details from it
    firebaseConfigDetails.txt
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var StudentDetailsDB = firebase.database().ref("StudentDetails");

document.getElementById("StudentDetails").addEventListener("submit", submitForm);

function showError(errorMessage) {
    var errorContainer = document.querySelector(".error-alert");
    errorContainer.textContent = errorMessage;
    errorContainer.classList.add("show"); // Remove the 'hidden' class to display the error message
  }
  

  function submitForm(e) {
    e.preventDefault();
  
    // Get the input field values
    var name = getElementVal("name");
    var stdCode = getElementVal("stdCode");
    var sem = getElementVal("sem");
    var batch = getElementVal("batch");
  
    // Check if any required field is empty
    if (name === "" || stdCode === "" || sem === "" || batch === "") {
      showError("Please fill in all the fields."); // Display error message
      document.querySelector(".error-alert").style.display = "block";
      
      setTimeout(() => {
        document.querySelector(".error-alert").style.display = "none";
      }, 3000);
    
      // Reset the form
      document.getElementById("StudentDetails").reset();
      return;
    }
  
    saveMessages(name, stdCode, sem, batch);
  
    // Enable alert
    document.querySelector(".alert").style.display = "block";
  
    // Remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    // Reset the form
    document.getElementById("StudentDetails").reset();
  }
  
const saveMessages = (name, stdCode, sem, batch) => {
  var stdCodeParts = stdCode.split('_'); // Split stdCode by underscores
  var lastPart = stdCodeParts[stdCodeParts.length - 1]; // Get the last part of stdCode

    var stdCodeRef = StudentDetailsDB.child(lastPart);

    var data = {
      name: name,
      stdCode: stdCode,
      sem: sem,
      batch: batch
    };

    stdCodeRef.set(data);
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function(){
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
}

function updateFileName() {
  var input = document.getElementById('input-file');
  var label = document.querySelector('.custom-file-label');

  if (input.files && input.files.length > 0) {
    label.textContent = input.files[0].name;
  } else {
    label.textContent = 'Choose File';
  }
}
