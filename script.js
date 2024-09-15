function showParticipantForm() {
    const numParticipants = parseInt(document.getElementById('numParticipants').value, 10);
    if (isNaN(numParticipants) || numParticipants < 1) {
        alert('Please enter a valid number of participants.');
        return;
    }

    const participantSection = document.getElementById('participantSection');
    const participantsFields = document.getElementById('participantsFields');
    participantsFields.innerHTML = '';

    for (let i = 0; i < numParticipants; i++) {
        participantsFields.innerHTML += `
            <div>
                <input type="text" id="participantName${i}" placeholder="Participant ${i + 1} Name" required>
                <input type="number" id="participantShare${i}" placeholder="Share (INR)" step="0.01" required>
            </div>
        `;
    }

    participantSection.style.display = 'block';
}

function calculateResults() {
    const numParticipants = parseInt(document.getElementById('numParticipants').value, 10);
    const expectedBudget = parseFloat(document.getElementById('expectedBudget').value);
    const tripDate = new Date(document.getElementById('startDate').value);
    const today = new Date();
    const daysUntilTrip = Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));

    if (isNaN(numParticipants) || numParticipants < 1 || isNaN(expectedBudget) || expectedBudget <= 0 || isNaN(daysUntilTrip) || daysUntilTrip <= 0) {
        alert('Please enter valid details.');
        return;
    }

    const participantsSummary = document.getElementById('participantsSummary');
    const resultsOutput = document.getElementById('resultsOutput');
    let totalShare = 0;
    let participantDetails = '';

    for (let i = 0; i < numParticipants; i++) {
        const name = document.getElementById(`participantName${i}`).value;
        const share = parseFloat(document.getElementById(`participantShare${i}`).value);
        if (isNaN(share) || share < 0) {
            alert('Please enter valid shares.');
            return;
        }
        totalShare += share;
        participantDetails += `<p>${name}: ${share} INR</p>`;
    }

    const perPersonBudget = expectedBudget / numParticipants;
    const savingsPerWeek = (perPersonBudget / daysUntilTrip) * 7;
    
    participantsSummary.innerHTML = `
        <h3>Participants Summary</h3>
        ${participantDetails}
        <p>Total Expected Budget: ${expectedBudget} INR</p>
        <p>Budget per Participant: ${perPersonBudget.toFixed(2)} INR</p>
    `;

    resultsOutput.innerHTML = `
        <h3>Savings Required</h3>
        <p>Each participant needs to save ${savingsPerWeek.toFixed(2)} INR per week to fulfill their expected budget.</p>
    `;

    document.getElementById('resultsSection').style.display = 'block';
}
