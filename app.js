// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // show loader
  document.getElementById('loading').style.display = 'block';

  // Hide results
  document.getElementById('results').style.display = 'none';

  setTimeout(calculatesResults, 2000)

  e.preventDefault();
});

// calculates Result
function calculatesResults(e) {
  // All UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    // show loader
    document.getElementById('loading').style.display = 'none';

    // Hide results
    document.getElementById('results').style.display = 'block';
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
  } else {
    showError('Please check your numbers...')
  }
}

// Show error
function showError(error) {
  // show loader
  document.getElementById('loading').style.display = 'none';

  // Hide results
  // document.getElementById('results').style.display = 'block';

  // creat div
  const errorDiv = document.createElement('div');

  // get element
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // creat text node
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearTimeout, 3000);
}

function clearTimeout() {
  document.querySelector('.alert').remove();
}