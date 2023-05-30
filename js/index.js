const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const repositories = document.getElementById('repositories');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = searchInput.value.trim();
  if (username) {
    searchUsers(username);
  }
});

function searchUsers(username) {
  const searchUrl = `https://api.github.com/search/users?q=${username}`;
  
  fetch(searchUrl)
    .then(function (response){
    return response.json();
})
    .then(function(data) {
      return displayUsers(data.items);
    })
    .catch(error => {
      console.error('this is an Error:', error);
    });
}

function displayUsers(users) {
  searchResults.innerHTML = '';
  
  if (users.length === 0) {
    searchResults.innerHTML = 'Unknown.';
    return;
  }
  
  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerHTML = `
      <img src="${user.avatar_url}" alt="Avatar" width="100">
      <h3>${user.login}</h3>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    `;
    userElement.addEventListener('click', () => {
      getUserRepositories(user.login);
    });
    searchResults.appendChild(userElement);
  });
}

function getUserRepositories(username) {
  const reposUrl = `https://api.github.com/users/${username}/repos`;
  
  fetch(reposUrl)
    .then(function (response) {
        return response.json()})
    .then(function (repos) {
      return displayRepositories(repos);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayRepositories(repos) {
  repositories.innerHTML = '';
  
  if (repos.length === 0) {
    repositories.innerHTML = 'No repositories found.';
    return;
  }};
