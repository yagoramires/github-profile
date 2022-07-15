const APIURL = 'https://api.github.com/users/';

const mainEl = document.querySelector('#main');
const searchEl = document.querySelector('#search');
const formEl = document.querySelector('#form');

async function getData(username) {
  const res = await fetch(`${APIURL}${username}`);
  const data = await res.json();
  console.log(data);
  createCard(data);
  getRepos(username);
}

async function getRepos(username) {
  const res = await fetch(APIURL + username + '/repos');
  const data = await res.json();

  addRepos(data);
}

function createCard(user) {
  const { avatar_url, name, bio, followers, following, public_repos } = user;
  console.log(user);
  const cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li><span>Followers:</span> ${user.followers} </li>
                <li><span>Following:</span> ${user.following} </li>
                <li><span>Repos:</span> ${user.public_repos} </li>
            </ul>

            </div>
        </div>    
        <div id="repos" class="repos">
        <h3>${user.login} repos:</h3>
        </div>
    `;

  mainEl.innerHTML = cardHTML;
}

function addRepos(repos) {
  console.log(repos);
  const reposEl = document.querySelector('#repos');

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count) //ordenar por estrelas
    .slice(0, 10) //cortar os 10 primeiros
    .forEach((repo) => {
      const repoEl = document.createElement('a');

      repoEl.classList.add('repo');
      repoEl.href = repo.html_url;
      repoEl.target = '_blank';
      repoEl.innerHTML = repo.name;

      reposEl.appendChild(repoEl); // add cada um
    });
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = `${searchEl.value}`;

  username ? getData(username) : '';
});
