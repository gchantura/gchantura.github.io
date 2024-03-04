document.addEventListener("DOMContentLoaded", function() {
    // Check if employee's name and email are already stored in localStorage
    const storedName = localStorage.getItem('employeeName');
    const storedEmail = localStorage.getItem('employeeEmail');

    // If stored values exist, populate the respective input fields
    if (storedName) {
        document.getElementById('contactName').value = storedName;
    }
    if (storedEmail) {
        document.getElementById('contactEmail').value = storedEmail;
    }

    // Function to dynamically add attachment inputs
    document.getElementById("addAttachment").addEventListener("click", function() {
        const attachmentsContainer = document.getElementById("attachmentsContainer");
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.name = "attachment";
        fileInput.addEventListener("change", function() {
            const commentInput = document.createElement("input");
            commentInput.type = "text";
            commentInput.name = "attachmentComment";
            commentInput.placeholder = "Comment for this file";
            attachmentsContainer.appendChild(commentInput);
        });
        attachmentsContainer.appendChild(fileInput);
    });

    // Form submission handling
    document.querySelector(".send-out-button").addEventListener("click", function() {
        // Reset border color for all input fields
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });

        // Check for empty or invalid fields
        let isValid = true;

        // Client Name validation
        const clientNameSelect = document.getElementById('clientName');
        if (clientNameSelect.value === '') {
            clientNameSelect.style.borderColor = 'red';
            isValid = false;
        }

        // Contact Person validation
        const contactNameInput = document.getElementById('contactName');
        if (contactNameInput.value.trim().length === 0) {
            contactNameInput.style.borderColor = 'red';
            isValid = false;
        }

        // Country validation
        const countrySelect = document.getElementById('country');
        if (countrySelect.value === '') {
            countrySelect.style.borderColor = 'red';
            isValid = false;
        }

        // Subject validation
        const subjectInput = document.getElementById('subject');
        if (subjectInput.value.trim().length === 0 || subjectInput.value.trim().length < 6) {
            subjectInput.style.borderColor = 'red';
            isValid = false;
        }

        // Recipient validation
        const recipientSelect = document.getElementById('recipient');
        if (recipientSelect.value === '') {
            recipientSelect.style.borderColor = 'red';
            isValid = false;
        }

        // Message validation
        const messageTextarea = document.getElementById('message');
        if (messageTextarea.value.trim().length === 0) {
            messageTextarea.style.borderColor = 'red';
            isValid = false;
        }

        // Attachment validation for ETL category
        const categorySelect = document.getElementById('category');
        if (categorySelect.value === 'ETL') {
            const attachmentInputs = document.querySelectorAll('input[type="file"]');
            let attachmentProvided = false;
            attachmentInputs.forEach(input => {
                if (input.files.length > 0) {
                    attachmentProvided = true;
                }
            });
            if (!attachmentProvided) {
                isValid = false;
                alert("Attachments are mandatory for ETL category.");
            }
        }

        if (!isValid) {
            // Notify user about mandatory fields
            alert("Please fill in all mandatory fields.");
        } else {
            // Notification for Process category
            if (categorySelect.value === 'Processes') {
                const notificationDiv = document.getElementById('processNotification');
                notificationDiv.style.display = 'block';
            }
            
            alert("Form submitted successfully!");
            // Store employee's name and email in localStorage
            localStorage.setItem('employeeName', document.getElementById('contactName').value);
            localStorage.setItem('employeeEmail', document.getElementById('contactEmail').value);
        }
    });

    // Populate and sort the category dropdown
    const categorySelect = document.getElementById('category');
    const categoryOptions = [
        "Accident Management",
        "Apps",
        "Car Configurator",
        "Car Configurator Admin",
        "eInvoice",
        "ETL",
        "Fleet Management",
        "Interfaces",
        "Jato Matching",
        "Order Management",
        "Processes",
        "Reports",
        "Server",
        "Service Portal",
        "Settings",
        "Support",
        "User Management",
        "Other"
    ];
    categoryOptions.sort((a, b) => {
        if (a === 'Other') return 1;
        if (b === 'Other') return -1;
        return a.localeCompare(b);
    });
    categoryOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        categorySelect.appendChild(optionElement);
    });

    // Show other category input field if "Other" is selected
    const otherCategoryInput = document.getElementById('otherCategory');
    categorySelect.addEventListener('change', function() {
        if (this.value === 'Other') {
            otherCategoryInput.style.display = 'block';
            otherCategoryInput.required = true; // Make it mandatory
        } else {
            otherCategoryInput.style.display = 'none';
            otherCategoryInput.required = false; // Make it non-mandatory
        }
    });

    // Checkbox - deadline
    const deadlineCheckbox = document.getElementById('deadlineCheckbox');
    const deadlineDate = document.getElementById('deadlineDate');

    deadlineCheckbox.addEventListener('change', function() {
        if (this.checked) {
            deadlineDate.style.display = 'block';
        } else {
            deadlineDate.style.display = 'none';
        }
    });

    //Format Deadline
    function formatDate(input) {
        var date = new Date(input.value);
        var formattedDate = date.getFullYear() + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + ('0' + date.getDate()).slice(-2);
        input.value = formattedDate;
    }

    // Function to populate the country dropdown
    function populateCountryDropdown() {
        const countries = [
            "Argentina", "Austria", "Belgium", "Brazil", "Bulgaria", "Chile", "Colombia", "Croatia", "Czech Republic",
            "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Israel", "Italy", "Kazakhstan",
            "Luxembourg", "Mexico", "Netherlands", "Norway", "Peru", "Poland", "Portugal", "Puerto Rico", "Romania",
            "Russia", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine",
            "United Kingdom", "Uruguay"
        ];

        const countrySelect = document.getElementById('country');
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

    // Call the function to populate the country dropdown
    populateCountryDropdown();

    // Populate the client name dropdown
    const clientNameSelect = document.getElementById('clientName');
    const clientNames = [
        "medtronic.fleets.eu",
        "bayer.fleets.eu",
        "pepsico.fleets.eu",
        "engie.fleets.eu",
        "panasonic.fleets.eu",
        "einvoice.fleets.eu",
        "zimmerbiomet.fleets.eu",
        "claims.fleets.eu",
        "dse.fleets.eu",
        "demo.fleets.eu",
        "danfoss.fleets.eu",
        "amcor.fleets.eu",
        "accenture.fleets.eu",
        "3ds.fleets.eu",
        "accuray.fleets.eu",
        "airproducts.fleets.eu",
        "amat.fleets.eu",
        "amex.fleets.eu",
        "aspen.fleets.eu",
        "avanade.fleets.eu",
        "baloise.fleets.eu",
        "binordic.fleets.eu",
        "bsh.fleets.eu",
        "corning.fleets.eu",
        "cslbehring.fleets.eu",
        "edeka.fleets.eu",
        "euromicron.fleets.eu",
        "fedrus.fleets.eu",
        "givaudan.fleets.eu",
        "grt.fleets.eu",
        "gsk.fleets.eu",
        "haemonetics.fleets.eu",
        "hager.fleets.eu",
        "haleon.fleets.eu",
        "henkel.fleets.eu",
        "here.fleets.eu",
        "huntsman.fleets.eu",
        "jlg.fleets.eu",
        "karlstorz.fleets.eu",
        "kuka.fleets.eu",
        "linde.fleets.eu",
        "livanova.fleets.eu",
        "management.fleets.eu",
        "merckgroupit.fleets.eu",
        "norgine.fleets.eu",
        "norma.fleets.eu",
        "orange.fleets.eu",
        "penumbra.fleets.eu",
        "pmi.fleets.eu",
        "randstad.fleets.eu",
        "rstahl.fleets.eu",
        "rwe.fleets.eu",
        "samsic.fleets.eu",
        "sap.fleets.eu",
        "sgs.fleets.eu",
        "signaliduna.fleets.eu",
        "sodexo.fleets.eu",
        "syntegon.fleets.eu",
        "uniper.fleets.eu",
        "xyz.fleets.eu",
        "zambon.fleets.eu",
    ];

    clientNames.forEach(client => {
        const optionElement = document.createElement('option');
        optionElement.value = client;
        optionElement.textContent = client;
        clientNameSelect.appendChild(optionElement);
    });
});
