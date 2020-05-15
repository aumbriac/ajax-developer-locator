$('button').click(function () {
 $('#avatar-link').attr('href', '#!');
 $('#avatar-link').attr('target', '');
 $('#root').html('');
 $('#user-info').html('');
 var username = $('#username').val();
 if (username === '') {
  document.getElementById('user-image').src = 'github-logo.png';
  return alert('Please enter a Github username');
 }

 $.ajax({
  method: 'GET',
  url: `https://api.github.com/users/${username}/repos`,
  headers: {
   Authorization: 'Basic',
  },
  beforeSend: function () {
   $('#loader').html(`<div class="progress">
    <div class="indeterminate"></div>
</div>`);
  },
  success: function (data) {
   $.each(data, function (index, repo) {
    let div = document.createElement('div'),
     dynamicColor;

    switch (repo.language) {
     case 'PHP':
      dynamicColor = 'darkslateblue';
      break;
     case 'JavaScript':
      dynamicColor = 'gold';
      break;
     case 'Java':
      dynamicColor = 'brown';
      break;
     case 'TypeScript':
      dynamicColor = 'teal';
      break;
     case 'Python':
      dynamicColor = 'indigo';
      break;
     case 'HTML':
      dynamicColor = 'red';
      break;
     case 'CSS':
      dynamicColor = 'purple';
      break;
     default:
      dynamicColor = 'gray';
      break;
    }
    div.innerHTML = `
<div class="col s4 m4 l6">
<div class="container-fluid" style="width: auto;">
<div class="card hoverable">
<div class="card-content">
<p class="flow-text card-title truncate">${repo.name}</p>
<h6>${repo.description ? repo.description : 'No description provided.'}</h6>
<div class="chip z-depth-2" style="background: ${dynamicColor}">
${repo.language ? repo.language : 'N/A'}
</div>
</div>
<div class="card-action"> 
<a class="btn-floating halfway-fab waves-effect waves-light btn-large blue darken-1" href="${
     repo.html_url
    }" target="_blank"><i class="material-icons">link</i></a>
<a class="truncate" target="_blank" href="${repo.html_url}">${repo.html_url}</a>

</div>
</div>
</div>
</div>
  `;
    div.style.padding = '1rem';
    $('#avatar-link').attr('href', `${repo.owner.html_url}`);
    $('#avatar-link').attr('target', '_blank');
    document.getElementById('root').appendChild(div);
    document.getElementById('user-image').src = `${repo.owner.avatar_url}`;
    document.getElementById(
     'user-info'
    ).innerHTML = `<a href="${repo.owner.html_url}" target="_blank">${repo.owner.login}</a>'s Repos`;
   });
  },
  error: function () {
   document.getElementById(
    'root'
   ).innerHTML = `<h3 class="center">No repos found for '${username}'</h3>`;
   document.getElementById('user-image').src = 'github-logo.png';
  },
  complete: function () {
   $('#loader').html('');
  },
 });
});
