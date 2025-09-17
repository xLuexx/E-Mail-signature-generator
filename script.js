// script.js

document.addEventListener('DOMContentLoaded', () => {
    const fields = [
        'fullName', 'jobTitle', 'companyName', 'phone', 'email', 'website',
        'linkedin', 'customText', 'logoWidth'
    ];
    const elements = {};
    fields.forEach(id => {
        elements[id] = document.getElementById(id);
    });
    elements.logoUpload = document.getElementById('logoUpload');
    elements.logoPreview = document.getElementById('logoPreview');
    elements.signaturePreview = document.getElementById('signaturePreview');
    elements.htmlOutput = document.getElementById('htmlOutput');
    elements.plainTextOutput = document.getElementById('plainTextOutput');
    elements.generateSignature = document.getElementById('generateSignature');

    let uploadedLogoUrl = '';

    // Function to update the signature preview
    function updatePreview() {
        const fullName = elements.fullName.value;
        const jobTitle = elements.jobTitle.value;
        const companyName = elements.companyName.value;
        const phone = elements.phone.value;
        const email = elements.email.value;
        const website = elements.website.value;
        const linkedin = elements.linkedin.value;
        const customText = elements.customText.value;
        const logoWidth = elements.logoWidth.value;

        // Start building the HTML for the preview
        let previewHtml = `
            <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4;">
        `;

        // Add logo if available
        if (uploadedLogoUrl) {
            previewHtml += `
                <img src="${uploadedLogoUrl}" alt="${companyName || 'Company'} Logo" style="max-width: ${logoWidth}px; height: auto; display: block; margin-bottom: 8px;">
            `;
        }

        // Main info
        if (fullName) {
            previewHtml += `<strong style="color: #0056b3;">${fullName}</strong><br>`;
        }
        if (jobTitle) {
            previewHtml += `${jobTitle}<br>`;
        }
        if (companyName) {
            previewHtml += `<span style="color: #555;">${companyName}</span><br>`;
        }

        // Contact info
        if (phone) {
            previewHtml += `Phone: <a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a><br>`;
        }
        if (email) {
            previewHtml += `Email: <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a><br>`;
        }
        if (website) {
            let displayWebsite = website.replace(/^(https?:\/\/)/, ''); // Remove http/https for display
            previewHtml += `Web: <a href="${website}" target="_blank" style="color: #007bff; text-decoration: none;">${displayWebsite}</a><br>`;
        }

        // Social Media
        let socialMediaHtml = '';
        if (linkedin) {
            socialMediaHtml += `<a href="${linkedin}" target="_blank" style="margin-right: 5px; text-decoration: none;"><img src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svgs/brands/linkedin.svg" alt="LinkedIn" width="18" height="18" style="vertical-align: middle;"></a>`;
            // For real icons, you'd need to host them or use an external service like Font Awesome CDN SVGs
            // For this example, I'll use text or a placeholder for the SVG
            socialMediaHtml += `<a href="${linkedin}" target="_blank" style="color: #007bff; text-decoration: none; margin-right: 10px;">LinkedIn</a>`;
        }
        // Add more social media icons/links here
        if (socialMediaHtml) {
            previewHtml += `<div style="margin-top: 8px;">${socialMediaHtml}</div>`;
        }

        // Custom text / Disclaimer
        if (customText) {
            previewHtml += `
                <div style="margin-top: 10px; font-size: 10px; color: #777;">
                    ${customText}
                </div>
            `;
        }

        previewHtml += `</div>`;
        elements.signaturePreview.innerHTML = previewHtml;
    }

    // Function to generate and display final HTML and Plain Text
    function generateFinalSignatures() {
        const fullName = elements.fullName.value;
        const jobTitle = elements.jobTitle.value;
        const companyName = elements.companyName.value;
        const phone = elements.phone.value;
        const email = elements.email.value;
        const website = elements.website.value;
        const linkedin = elements.linkedin.value;
        const customText = elements.customText.value;
        const logoWidth = elements.logoWidth.value;

        // --- Generate HTML Signature ---
        let htmlSignature = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    /* Basic inline styles for email client compatibility */
    body, p, div {
        font-family: Arial, sans-serif;
        font-size: 12px;
        line-height: 1.4;
        color: #333333;
    }
    a {
        color: #007bff;
        text-decoration: none;
    }
    strong {
        color: #0056b3;
    }
    .disclaimer {
        font-size: 10px;
        color: #777777;
        margin-top: 10px;
    }
</style>
</head>
<body>
<div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #333333;">
`;

        if (uploadedLogoUrl) {
            htmlSignature += `
    <img src="${uploadedLogoUrl}" alt="${companyName || 'Company'} Logo" style="max-width: ${logoWidth}px; height: auto; display: block; margin-bottom: 8px;">
`;
        }

        if (fullName) {
            htmlSignature += `    <strong style="color: #0056b3;">${fullName}</strong><br>`;
        }
        if (jobTitle) {
            htmlSignature += `    ${jobTitle}<br>`;
        }
        if (companyName) {
            htmlSignature += `    <span style="color: #555;">${companyName}</span><br>`;
        }
        if (fullName || jobTitle || companyName) {
            htmlSignature += `<br>`; // Add a small break after main info
        }


        if (phone) {
            htmlSignature += `    Phone: <a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a><br>`;
        }
        if (email) {
            htmlSignature += `    Email: <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a><br>`;
        }
        if (website) {
            let displayWebsite = website.replace(/^(https?:\/\/)/, '');
            htmlSignature += `    Web: <a href="${website}" target="_blank" style="color: #007bff; text-decoration: none;">${displayWebsite}</a><br>`;
        }

        // Social Media (using Font Awesome CDNs for icons)
        let socialMediaHtml = '';
        if (linkedin) {
            socialMediaHtml += `
            <a href="${linkedin}" target="_blank" style="text-decoration: none; margin-right: 5px;">
                <img src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svgs/brands/linkedin.svg" alt="LinkedIn" width="18" height="18" style="vertical-align: middle;">
            </a>
            `;
        }
        // Add more social media icons here using similar img tags pointing to Font Awesome SVGs
        // Example for Twitter:
        // if (twitter) {
        //     socialMediaHtml += `<a href="${twitter}" target="_blank" style="text-decoration: none; margin-right: 5px;"><img src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svgs/brands/twitter.svg" alt="Twitter" width="18" height="18" style="vertical-align: middle;"></a>`;
        // }
        
        if (socialMediaHtml) {
            htmlSignature += `    <div style="margin-top: 8px;">${socialMediaHtml}</div>`;
        }

        if (customText) {
            htmlSignature += `
    <div class="disclaimer" style="margin-top: 10px; font-size: 10px; color: #777777;">
        ${customText}
    </div>
`;
        }

        htmlSignature += `
</div>
</body>
</html>`;
        elements.htmlOutput.value = htmlSignature;

        // --- Generate Plain Text Signature ---
        let plainTextSignature = '';
        if (fullName) plainTextSignature += `${fullName}\n`;
        if (jobTitle) plainTextSignature += `${jobTitle}\n`;
        if (companyName) plainTextSignature += `${companyName}\n`;
        if (phone) plainTextSignature += `Phone: ${phone}\n`;
        if (email) plainTextSignature += `Email: ${email}\n`;
        if (website) plainTextSignature += `Website: ${website}\n`;
        if (linkedin) plainTextSignature += `LinkedIn: ${linkedin}\n`;
        if (customText) plainTextSignature += `\n---\n${customText.replace(/<\/?[^>]+(>|$)/g, "")}\n`; // Remove HTML tags from custom text

        elements.plainTextOutput.value = plainTextSignature.trim();
    }

    // Event Listeners for live preview
    fields.forEach(id => {
        if (elements[id]) {
            elements[id].addEventListener('input', updatePreview);
        }
    });

    // Logo upload handler
    elements.logoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedLogoUrl = e.target.result;
                elements.logoPreview.src = uploadedLogoUrl;
                elements.logoPreview.style.display = 'block';
                updatePreview(); // Update preview with new logo
            };
            reader.readAsDataURL(file); // Reads the image as a Data URL
        } else {
            uploadedLogoUrl = '';
            elements.logoPreview.src = '';
            elements.logoPreview.style.display = 'none';
            updatePreview(); // Update preview (remove logo)
        }
    });

    // Generate Signature button click
    elements.generateSignature.addEventListener('click', generateFinalSignatures);

    // Initial preview update on page load
    updatePreview();
});

// Function to copy text to clipboard
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    element.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    alert('Copied to clipboard!');
}