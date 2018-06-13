// Listen Submit Form
document.getElementById('loan-form').addEventListener('submit',(e)=>{
  
  //Hide Results
  document.getElementById('results').style.display = 'none';

  //Show Loading
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults,2000);
  e.preventDefault();
});

function calculateResults(e)
{
  //Form Inputs
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  //Results Inputs
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //Inputs Values
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 /12;
  const calculatedPayments = parseFloat(years.value) * 12;
  const x = Math.pow(1 + calculatedInterest,calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    //Show Loading
    document.getElementById('loading').style.display = 'block';
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    //Show Results
    document.getElementById('results').style.display = 'block';
    //Hide Loading
    document.getElementById('loading').style.display = 'none';
  }else{
    showError('Fill All Inputs with numbers');
  }

}

function showError(error)
{
  //Hide Results
  document.getElementById('results').style.display = 'none';
  //Hide Loading
  document.getElementById('loading').style.display = 'none';
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //Creating Div
  const errorDiv = document.createElement('div');
  //Adding Classname
  errorDiv.className = 'alert alert-danger';
  //Appending Text Node
  errorDiv.appendChild(document.createTextNode(error));
  //Insert inside .card & Before .heading
  card.insertBefore(errorDiv,heading);
  //Clear Error
  setTimeout(clearError,3000);
}

function clearError()
{
  document.querySelector('.alert').remove();
}