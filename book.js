const rideForm = document.getElementById("rideForm");

rideForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const bike = document.getElementById("bike").value;
    const date = document.getElementById("date").value;

    // Name
    if(name.length < 3){
        alert("Please enter a valid name.");
        return;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        alert("Please enter a valid email address.");
        return;
    }

    // Phone (10 digits)
    const phonePattern = /^[0-9]{10}$/;

    if(!phonePattern.test(phone)){
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Bike
    if(bike === ""){
        alert("Please select a motorcycle.");
        return;
    }

    // Date
    if(date === ""){
        alert("Please select a test ride date.");
        return;
    }

    alert("✅ Test ride booked successfully!");

    rideForm.reset();

});
