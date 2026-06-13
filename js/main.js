var changePhoto = document.getElementById("changePhoto");

changePhoto.addEventListener("click", function () {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();
});

var fullName = document.getElementById("name-input");
var phoneNumber = document.getElementById("phone-input");
var emailAddress = document.getElementById("email-input");
var address = document.getElementById("address-input");
var group = document.getElementById("group-select");
var notes = document.getElementById("notes-input");
var favoriteCheckbox = document.getElementById("favorite-checkbox");
var emergencyCheckbox = document.getElementById("emergency-checkbox");

var contactsArr = [];
if (localStorage.getItem("allContacts") !== null) {
    contactsArr = JSON.parse(localStorage.getItem("allContacts"));
    displayContact();
}

var editIndex = null;

// Create

var addContact = function () {
     if (fullName.value === "" || phoneNumber.value === "" || emailAddress.value === "" || address.value === "" ) {
       Swal.fire({
  icon: "error",
  title: "Missing ",
  text: "Please enter a name for the contact!!",
 
});
        return;
    }


    var contact = {
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        emailAddress: emailAddress.value,
        address: address.value,
        group: group.value,
        notes: notes.value,
        isFavorite: favoriteCheckbox.checked,
        isEmergency: emergencyCheckbox.checked ,
    };

     if (editIndex !== null) {
      
        contactsArr[editIndex] = contact;
        editIndex = null;
        document.getElementById("staticBackdropLabel").textContent = "Add New Contact";
        Swal.fire({ title: "Updated!", text: "Contact updated successfully.", icon: "success" });
    } else {
       
        contactsArr.push(contact);
        Swal.fire({ title: "Added!", text: "Contact added successfully.", icon: "success" });
    }

    localStorage.setItem("allContacts", JSON.stringify(contactsArr));

    displayContact();
    resetForm()
    var modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
}

// Retive

function displayContact(arr) {
    var list = arr || contactsArr;
    var cartoona = "";
    for (var i = 0; i < list.length; i++) {
          
        var initials = list[i] .fullName
            .split(" ")
            .map(w => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

        cartoona += `
        <div class="col-12 col-sm-6">
            <div class="contact-card bg-white rounded-custom p-3 border border-light-subtle shadow-sm">
                <div class="card-top d-flex align-items-center gap-3 mb-3">
                    <div class="card-avatar-wrapper position-relative flex-shrink-0">
                        <div class="card-avatar rounded-3 d-flex align-items-center justify-content-center">
                            <span class="avatar-initials">${initials}</span>
                        </div>
                        <span class="badge-favorite position-absolute ${list[i] .isFavorite ? '' : 'd-none'}">
                            <i class="fa-solid fa-star"></i>
                        </span>
                        <span class="badge-emergency position-absolute ${list[i] .isEmergency ? '' : 'd-none'}">
                            <i class="fa-solid fa-heart-pulse"></i>
                        </span>
                    </div>
                    <div class="card-info flex-grow-1">
                        <h6 class="card-name mb-1">${list[i] .fullName}</h6>
                        <p class="card-phone mb-0">
                            <span class="phone-icon-box me-2">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            ${list[i] .phoneNumber}
                        </p>
                    </div>
                </div>
                <div class="card-detail-item mb-2">
                    <span class="detail-icon-box email-box me-2">
                        <i class="fa-solid fa-envelope"></i>
                    </span>
                    <span class="detail-text">${list[i] .emailAddress}</span>
                </div>
                <div class="card-detail-item mb-3">
                    <span class="detail-icon-box address-box me-2">
                        <i class="fa-solid fa-location-dot"></i>
                    </span>
                    <span class="detail-text">${list[i] .address}</span>
                </div>
                ${list[i] .isFavorite ? `
                <div class="card-tags mb-3">
                    <span class="tag-Favorite">
                        <i class="fa-solid fa-star "></i>  Favorites
                    </span>
                </div>` : ''}
                ${list[i] .isEmergency ? `
                <div class="card-tags mb-3">
                    <span class="tag-emergency">
                        <i class="fa-solid fa-heart-pulse me-1"></i> Emergency
                    </span>
                </div>` : ''}
                <hr class="my-2">
                <div class="card-actions d-flex align-items-center justify-content-between">
                    <div class="d-flex gap-2">
                        <a href="tel:${list[i] .phoneNumber}" class="action-btn call-btn">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                        <a href="mailto:${list[i] .emailAddress}" class="action-btn msg-btn">
                            <i class="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <button class="action-icon-btn fav-btn ${list[i] .isFavorite ? 'active' : ''}" onclick="toggleFavorite(${i})">
                            <i class="fa-solid fa-star"></i>
                        </button>
                        <button class="action-icon-btn emg-btn ${list[i] .isEmergency ? 'active' : ''}"  onclick="toggleEmergency(${i})">
                            <i class="fa-solid fa-heart-pulse"></i>
                        </button>
                        <button class="action-icon-btn edit-btn"  onclick="editContact(${i})" >
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="action-icon-btn delete-btn" onclick="deleteContact(${i})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    }
  var container = document.getElementById("contactsList");
   console.log("list element:", container);
    console.log("cartoona:", cartoona);
    document.getElementById("contactsList").innerHTML = cartoona;
    updateStats();
    updateAside();
}
// reset 

function resetForm(){
  fullName.value = "";
  phoneNumber.value = "";
  emailAddress.value = "";
  address.value = "";
  group.selectedIndex = 0;
  notes.value = "";
  favoriteCheckbox.checked = false;
  emergencyCheckbox.checked = false;
  editIndex = null;
    document.getElementById("staticBackdropLabel").textContent = "Add New Contact";
}

// Update
function editContact(index) {
    editIndex = index;
    var contact = contactsArr[index];
    fullName.value = contact.fullName;
    phoneNumber.value = contact.phoneNumber;
    emailAddress.value = contact.emailAddress;
    address.value = contact.address;
    notes.value = contact.notes;
    favoriteCheckbox.checked = contact.isFavorite;
    emergencyCheckbox.checked = contact.isEmergency;

    document.getElementById("staticBackdropLabel").textContent = "Edit Contact";

    var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
}

// Delete
function deleteContact(index) {
    contactsArr.splice(index, 1);
    localStorage.setItem("allContacts", JSON.stringify(contactsArr));
    displayContact();
}

// search
function search() {
    var searchContact = document.querySelector(".search-input").value.toLowerCase();

    var filtered = contactsArr.filter(function(contact) {
        return contact.fullName.toLowerCase().includes(searchContact) ||
               contact.emailAddress.toLowerCase().includes(searchContact) ||
               contact.phoneNumber.toLowerCase().includes(searchContact);
    });

    displayContact(filtered);
}
// updateStats
function updateStats() {
    var total = contactsArr.length;
    var favorites = contactsArr.filter(c => c.isFavorite).length;
    var emergency = contactsArr.filter(c => c.isEmergency).length;

    document.querySelector("#quick-stats .col-lg-4:nth-child(1) .fs-4").textContent = total;
    document.querySelector("#quick-stats .col-lg-4:nth-child(2) .fs-4").textContent = favorites;
    document.querySelector("#quick-stats .col-lg-4:nth-child(3) .fs-4").textContent = emergency;
}
// updateAside
function updateAside() {
    var favList = contactsArr.filter(c => c.isFavorite);
    var emgList = contactsArr.filter(c => c.isEmergency);

    var favHTML = "";
    favList.forEach(function(contact) {
        var initials = contact.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
        favHTML += `
        <div class="aside-item">
            <div class="aside-item-avatar" style="background: linear-gradient(135deg, #f59e0b, #f97316);">
                <span>${initials}</span>
            </div>
            <div class="aside-item-info">
                <p class="aside-item-name">${contact.fullName}</p>
                <p class="aside-item-phone">${contact.phoneNumber}</p>
            </div>
            <button class="aside-call-btn aside-call-fav">
                <a href="tel:${contact.phoneNumber}" class="action-btn call-btn">
                    <i class="fa-solid fa-phone"></i>
                </a>
            </button>
        </div>`;
    });

    var emgHTML = "";
    emgList.forEach(function(contact) {
        var initials = contact.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
        emgHTML += `
        <div class="aside-item">
            <div class="aside-item-avatar" style="background: linear-gradient(135deg, #ef4444, #f97316);">
                <span>${initials}</span>
            </div>
            <div class="aside-item-info">
                <p class="aside-item-name">${contact.fullName}</p>
                <p class="aside-item-phone">${contact.phoneNumber}</p>
            </div>
            <button class="aside-call-btn aside-call-emergency">
                <a href="tel:${contact.phoneNumber}" class="action-btn call-btn">
                    <i class="fa-solid fa-phone"></i>
                </a>
            </button>
        </div>`;
    });

    document.getElementById("favorites-list").innerHTML = favHTML || "<p class='text-muted p-3'>No favorites yet</p>";
    document.getElementById("emergency-list").innerHTML = emgHTML || "<p class='text-muted p-3'>No emergency contacts</p>";
}

// toggleFavorite
function toggleFavorite(index) {
    contactsArr[index].isFavorite = !contactsArr[index].isFavorite;
    localStorage.setItem("allContacts", JSON.stringify(contactsArr));
    displayContact();
}
// toggleEmergency
function toggleEmergency(index) {
    contactsArr[index].isEmergency = !contactsArr[index].isEmergency;
    localStorage.setItem("allContacts", JSON.stringify(contactsArr));
    displayContact();
}