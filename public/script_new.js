fetch('/issues')
  .then(response => response.json())
  .then(data => {
    console.log("Issues", data);
    data.forEach(issue => {
      if (issue.Title && issue.description && issue.issue && issue.status && issue.priority && issue.severity && issue.assigne && issue.label) {
        addBugToList(issue.Title, issue.description, issue.issue, issue.status, issue.priority, issue.severity, issue.assigne, issue.label);
      }
    });
  })
  .catch(error => console.error(error));

// JavaScript code
const bugsList = document.getElementById('bugs-list');
const bugForm = document.getElementById('bug-form');
const submitBtn = document.getElementById('submit-btn');

// Function to add a new bug to the list
function addBugToList(name, description, issueType, statusType, priority, severity, assigne, label) {
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const assignep = document.createElement('p');
  const issueSpan = document.createElement('span');
  const statusSpan = document.createElement('span');
  const prioritySpan = document.createElement('span');
  const severitySpan = document.createElement('span');
  const labelSpan = document.createElement('p');

  h3.innerText = name;
  p.innerText = description;
  assignep.innerText = `Assigned to: ${assigne}`;
  issueSpan.innerText = `Issue Type: ${issueType}`;
  statusSpan.innerText = `Status Type: ${statusType}`;
  prioritySpan.innerText = `Priority: ${priority}`;
  severitySpan.innerText = `Severity: ${severity}`;
  labelSpan.innerText = `Tags / Labels: ${label}`;

  // Set margin-right for span elements
  issueSpan.style.marginRight = '10px';
  statusSpan.style.marginRight = '10px';
  prioritySpan.style.marginRight = '10px';
  severitySpan.style.marginRight = '10px';
  labelSpan.style.marginRight = '10px';

  //color for span elements
  issueSpan.style.backgroundColor = 'Black';
  issueSpan.style.color = 'White';
  statusSpan.style.backgroundColor = 'Black';
  statusSpan.style.color = 'White';
  prioritySpan.style.backgroundColor = 'Black';
  prioritySpan.style.color = 'White';
  severitySpan.style.backgroundColor = 'Black';
  severitySpan.style.color = 'White';
  labelSpan.style.backgroundColor = 'Black';
  labelSpan.style.color = 'White';
  labelSpan.style.width = "fit-content"


  li.appendChild(h3);
  li.appendChild(p);
  li.appendChild(assignep)
  li.appendChild(issueSpan);
  li.appendChild(statusSpan);
  li.appendChild(prioritySpan);
  li.appendChild(severitySpan);
  li.appendChild(labelSpan)

  bugsList.appendChild(li);
}

// Event listener for form submission
bugForm.addEventListener('submit', (event) => {
  event.preventDefault();
  bugForm.reset();
});