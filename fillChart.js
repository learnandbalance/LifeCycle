// Initialize two arrays to store scores for both charts
const expectationValues = new Array(10).fill(0); // Start with all values at 0 for Expectations
const realityValues = new Array(10).fill(0); // Start with all values at 0 for Reality

// Function to get the updated titles from the input fields
function getUpdatedTitles() {
    const titles = [];
    for (let i = 1; i <= 10; i++) {
        titles.push(document.getElementById(`title${i}`).value);
    }
    return titles;
}

// Function to get scores and fill the Expectations chart
function enterExpectationsAndFillChart() {
    const categories = getUpdatedTitles(); // Get the updated titles

    // Get scores for Expectations
    for (let i = 0; i < categories.length; i++) {
        let score = prompt(`Enter your score for ${categories[i]} (Verdiğiniz Önem) (0-10):`, 0);
        if (score !== null) {
            expectationValues[i] = Math.min(Math.max(parseInt(score), 0), 10); // Store the score, clamp between 0 and 10
        }
    }

    // Draw the Expectations chart
    drawScoreChart('expectationsChart', expectationValues, categories); 

    // Show the Reality button after filling the Expectations chart
    document.getElementById('fillRealityButton').style.display = 'block';
}

// Function to get scores and fill the Reality chart
function enterRealityAndFillChart() {
    const categories = getUpdatedTitles(); // Get the updated titles

    // Get scores for Reality
    for (let i = 0; i < categories.length; i++) {
        let score = prompt(`Enter your score for ${categories[i]} (Hayatınızdaki Varlığı) (0-10):`, 0);
        if (score !== null) {
            realityValues[i] = Math.min(Math.max(parseInt(score), 0), 10); // Store the score, clamp between 0 and 10
        }
    }

    // Draw the Reality chart
    drawScoreChart('realityChart', realityValues, categories);
}

// Function to draw the chart based on the scores
function drawScoreChart(canvasId, dataValues, categories) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2; // Center of the circle
    const centerY = canvas.height / 2;
    const radius = 180; // Radius of the circle
    const slices = dataValues.length; // Number of slices (10)
    const sliceAngle = (2 * Math.PI) / slices; // Angle for each slice
    const maxPoints = 10; // Maximum score (0-10)
    const pointRadiusIncrement = radius / maxPoints; // How much the radius increases for each point

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the slices with the entered scores
    for (let i = 0; i < slices; i++) {
        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        const sliceRadius = (dataValues[i] / maxPoints) * radius; // Scale the slice by the score

        // Draw the filled slice based on the score
        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Move to center of the circle
        ctx.arc(centerX, centerY, sliceRadius, startAngle, endAngle); // Create the arc based on the score
        ctx.closePath();

        // Set the color to black
        ctx.fillStyle = '#000000'; // Black fill for all slices
        ctx.fill();
    }

    // Draw the outline of the full circle and slices
    for (let i = 0; i <= maxPoints; i++) {
        const pointRadius = i * pointRadiusIncrement;

        // Draw the circle divisions (from 0 to 10)
        ctx.beginPath();
        ctx.arc(centerX, centerY, pointRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }

    // Draw the lines from the center to the outer edge for each slice
    for (let i = 0; i < slices; i++) {
        const startAngle = i * sliceAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Move to the center of the circle
        ctx.lineTo(centerX + Math.cos(startAngle) * radius, centerY + Math.sin(startAngle) * radius); // Draw line from center to outer edge
        ctx.stroke();
    }

    // Add category labels at the top of each slice
    ctx.fillStyle = '#000';  // Set label color to black
    ctx.font = '14px Arial'; // Set font style

    for (let i = 0; i < slices; i++) {
        const angle = i * sliceAngle + sliceAngle / 2; // Get the midpoint angle for the label
        const labelX = centerX + Math.cos(angle) * (radius + 20); // Place labels slightly outside the circle
        const labelY = centerY + Math.sin(angle) * (radius + 20);
        
        ctx.textAlign = 'center'; // Center the text horizontally
        ctx.textBaseline = 'middle'; // Center the text vertically
        ctx.fillText(categories[i], labelX, labelY); // Draw the category label
    }
}

// Add event listeners for the buttons to fill the charts
document.getElementById('fillExpectationsButton').addEventListener('click', enterExpectationsAndFillChart);
document.getElementById('fillRealityButton').addEventListener('click', enterRealityAndFillChart);
