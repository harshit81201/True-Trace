document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get the values filled by the user
    const step = document.getElementById('step').value;
    const amount = document.getElementById('amount').value;
    const oldbalanceOrg = document.getElementById('oldbalanceOrg').value;
    const newbalanceOrig = document.getElementById('newbalanceOrig').value;
    const oldbalanceDest = document.getElementById('oldbalanceDest').value;
    const newbalanceDest = document.getElementById('newbalanceDest').value;
    // Add additional fields if you have inputs for the transaction type flags

     // Get the selected transaction type
  const selectedType = document.getElementById('transactionType').value;

  // Initialize all types to 0
  const types = {
    "type_PAYMENT": 0,
    "type_TRANSFER": 0,
    "type_CASH_OUT": 0,
    "type_DEBIT": 0,
    "type_CASH_IN": 0
  };

  // Set the selected type to 1
  if (selectedType in types) {
    types[selectedType] = 1;
  }

  // Construct the data to send including the types
  const dataToSend = {
    "step": parseInt(document.getElementById('step').value),
    "amount": parseFloat(document.getElementById('amount').value),
    "oldbalanceOrg": parseFloat(document.getElementById('oldbalanceOrg').value),
    "newbalanceOrig": parseFloat(document.getElementById('newbalanceOrig').value),
    "oldbalanceDest": parseFloat(document.getElementById('oldbalanceDest').value),
    "newbalanceDest": parseFloat(document.getElementById('newbalanceDest').value),
    ...types
  };

});
  
    // Send the POST request
    fetch('https://true-trace-defcd7ebcff1.herokuapp.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const resultText = data.prediction === 1 ? "Fraudulent" : "Not Fraudulent";
      document.getElementById('result').textContent = `Result: ${resultText}`;
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById('result').textContent = "Error checking for fraud.";
    });
  