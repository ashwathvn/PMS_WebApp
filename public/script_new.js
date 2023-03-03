const dropdown = document.getElementById('issue');

fetch('/issues')
  .then(response => response.json())
  .then(data => {
    console.log("Issues", data);
    data.forEach(issue => {
      if (issue.Title && issue.description && issue.issue && issue.status && issue.priority && issue.severity) {
        addBugToList(issue.Title, issue.description, issue.issue, issue.status, issue.priority, issue.severity);
      }
    });
  })
  .catch(error => console.error(error));

// JavaScript code
const bugsList = document.getElementById('bugs-list');
const bugForm = document.getElementById('bug-form');
const submitBtn = document.getElementById('submit-btn');

// Function to add a new bug to the list
function addBugToList(name, description, issueType, statusType, priority, severity) {
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const issueSpan = document.createElement('span');
  const statusSpan = document.createElement('span');
  const prioritySpan = document.createElement('span');
  const severitySpan = document.createElement('span');

  h3.innerText = name;
  p.innerText = description;
  issueSpan.innerText = `Issue Type: ${issueType}`;
  statusSpan.innerText = `Status Type: ${statusType}`;
  prioritySpan.innerText = `Priority: ${priority}`;
  severitySpan.innerText = `Severity: ${severity}`;

  // Set margin-right for span elements
  issueSpan.style.marginRight = '10px';
  statusSpan.style.marginRight = '10px';
  prioritySpan.style.marginRight = '10px';
  severitySpan.style.marginRight = '10px';

  //color for span elements
  issueSpan.style.backgroundColor = 'Black';
  issueSpan.style.color = 'White';
  statusSpan.style.backgroundColor = 'Black';
  statusSpan.style.color = 'White';
  prioritySpan.style.backgroundColor = 'Black';
  prioritySpan.style.color = 'White';
  severitySpan.style.backgroundColor = 'Black';
  severitySpan.style.color = 'White';


  li.appendChild(h3);
  li.appendChild(p);
  li.appendChild(issueSpan);
  li.appendChild(statusSpan);
  li.appendChild(prioritySpan);
  li.appendChild(severitySpan);

  bugsList.appendChild(li);
}



// Event listener for form submission
bugForm.addEventListener('submit', (event) => {
  event.preventDefault();
  bugForm.reset();

fetch('/issues')
    .then(response => response.json())
    .then(data => {
      console.log("Issues", data);
      data.forEach(issue => {
        if (issue.Title && issue.description && issue.issue && issue.status && issue.priority && issue.severity) {
          addBugToList(issue.Title, issue.description, issue.issue, issue.status, issue.priority, issue.severity);
        }
      });
    })
    .catch(error => console.error(error));
  // const bugName = document.getElementById('bug-name').value;
  // const bugDescription = document.getElementById('bug-description').value;
  // const issueType = document.getElementById('issue-type').text;
  // const statusType = document.getElementById('status-type').text;
  // const priority = document.getElementById('priority').text;
  // const severity = document.getElementById('severity').text;
  //const file = document.getElementById('file-upload').files[0];

  // if (bugName.trim() === '' || bugDescription.trim() === '') {
  //   alert('Please enter a bug name and description.');
  //   return;
  // }
});
