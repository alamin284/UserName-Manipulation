let users = ["Alamin", "Nahid", "Nipun", "Thomo", "Eshaq", "Bashir", "Daud"];
let blockedUsers = ["unknownUser", "anonymous", "someone", "badUser", "spammer", "scammer"];
let tempClass = document.querySelectorAll('.temp');
let registery = document.querySelector('.registery');
let regInput = document.querySelector('.regInput');
let regBtn = document.querySelector('.regBtn');
let notice = document.querySelector('.notice');
let regSVG = document.querySelector('.registery svg');
let userList = document.querySelector('.userList div');
let blockedList = document.querySelector('.blockedList div');
let userInput = document.querySelector('#input');
let filteredSearch = document.querySelector('.filteredSearch input');
let filteredSearchBtn = document.querySelector('.filteredSearch img')
let isRegister = false;

window.onload = () => {
  users = localStorage.getItem('usersArray').split(",");
  blockedUsers = localStorage.getItem('blockedArray').split(",");
  regInput.value = localStorage.getItem("regInput");
  register();
}



function register() {
  isRegister = true;

  if (!regInput.value) {
    regInput.style.border = "2px solid crimson";
    setTimeout(() => {
      regInput.style.border = "";
    }, 500);
    return;
  } else if (regInput.value.length >= 6) {
    let newElem = document.createElement('div');
    notice.style.display = "block";
    notice.style.animation = "noticeInOut 4s linear";
    regBtn.style.display = "none";
    regInput.style.display = "none";
    newElem.innerHTML = `${regInput.value} <img class="signOut" src="imgs/signOut.svg">`;
    newElem.classList.add('regProfile');
    registery.appendChild(newElem);
    regSVG.style.border = "1px solid #71738C";
    regSVG.style.borderRadius = "3px";
    regSVG.style.boxShadow = "0 0 2px 3px rgba(113, 115, 140, .6) inset,0 0 0 3px rgba(113, 115, 140, .6)";
    tempClass[0].classList.remove('temp');
    tempClass[1].classList.remove('temp');
    setTimeout(() => {
      notice.style.display = "none";
    }, 4000);
    updateUser();
    updateBlockedUser();
    localStorage.setItem("regInput", regInput.value);
  }
  else {
    regInput.style.border = "1px solid purple";
    regInput.style.outline = "2px solid crimson";
    setTimeout(() => {
      regInput.style.border = "";
      regInput.style.outline = "";
    }, 1000)
  }
  let registeryOut = document.querySelector('.registery div img');
  registeryOut.onclick = () => {
    isRegister = false;
    regBtn.style.display = "block";
    regInput.style.display = "block";
    tempClass[0].classList.add('temp');
    tempClass[1].classList.add('temp');
    userList.innerHTML = "";
    blockedList.innerHTML = "";
    regInput.value = "";
    registery.removeChild(registery.lastChild);
  };

  document.querySelector('.sortUp').onclick = () => {
    users.sort();
    blockedUsers.sort();
    updateUser();
    updateBlockedUser();
  }

  document.querySelector('.sortDown').onclick = () => {
    users.sort().reverse();
    blockedUsers.sort().reverse();
    updateUser();
    updateBlockedUser();
  }

  document.querySelector('.wordCount').onclick = () => {
    let totalWords = users.join("");
    let ofBlocked = blockedUsers.join("");
    document.querySelector('.totalWords').innerHTML = `${totalWords.length}<sub style="color:crimson">${ofBlocked.length}</sub>`;

    let lengthListing = document.querySelectorAll('.userList div li span.indexing');
    let blockLengthListing = document.querySelectorAll('.blockedList div li span.indexing');
    users.forEach((v, i) => {
      lengthListing[i].innerHTML = `<span style="position:absolute;right:70%;bottom:5%;">▸</span> ${v.length}`;
    });
    blockedUsers.forEach((v, i) => {
      blockLengthListing[i].innerHTML = `<span style="position:absolute;right:70%;bottom:5%;">▸</span> ${v.length}`;
    });
  }


  filteredSearchBtn.onclick = () => {
    let textFiltering = document.querySelectorAll('.userList div li span.text');
    let textFilteringLI = document.querySelectorAll('.userList div li');

    users.forEach((v, i) => {
      if (!filteredSearch.value) {
        filteredSearch.style.border = "2px solid crimson";
        setTimeout(() => {
          filteredSearch.style.border = "";
        }, 500);
        return;
      } else {
        if (v.includes(filteredSearch.value)) {
          let text = "";
          users[i] = users[0];
          users[0] = v;
          let j = -1;
          setInterval(() => {
            j++;
            if (j < v.length) {
              text += v[j];
              textFiltering[0].innerHTML = text;
            }
          }, 200);
          setTimeout(() => { updateUser() }, 200 * v.length + 50);
          textFiltering[0].style.fontWeight = "900";
          textFilteringLI[0].style.webkitFilter = "brightness(120%)";
        }
      }
    });
  }
}




function updateUser() {
  let userName = `<h3 style="padding:7.5px 0;position: sticky; top: 0;">Registered user names</h3>`;
  users.forEach((v, i) => {
    userName += `<li> <span class="indexing">${i+1}</span><span class="text"> ${v} </span> <span class="close" onclick="removeList(${i})">&times;</span></li>`;
  });
  userList.innerHTML = userName;
}

function updateBlockedUser() {
  let blockUserName = `<h3 style="padding:7.5px 0";position: sticky; top: 0;>Blocked user names</h3>`;
  blockedUsers.forEach((v, i) => {
    blockUserName += `<li><span class="indexing">${i+1}</span> ${v} <span class="close" onclick="unblock(${i})">&times;</span></li>`;
  });
  blockedList.innerHTML = blockUserName;
}

function removeList(i) {
  let userListAnimation = document.querySelectorAll('.userList div li');
  if (confirm(`Are you sure to remove "${users[i]}".`)) {
    users.splice(i, 1);
    userListAnimation[i].style.animation = "close 1s linear";
    setTimeout(() => {
      updateUser();
      localStorage.setItem("usersArray", users);
    }, 600)
  }
}


function unblock(i) {
  let blockListAnimation = document.querySelectorAll('.blockedList div li');
  blockedUsers.splice(i, 1);
  blockListAnimation[i].style.animation = "close 1s linear";
  setTimeout(() => {
    updateBlockedUser();
    localStorage.setItem("blockedArray", blockedUsers);
  }, 600)
}

function checkingUser() {
  if (isRegister === true) {
    if (!userInput.value) {
      userInput.style.border = "2px solid crimson";
      setTimeout(() => {
        userInput.style.border = "";
      }, 500);
      return;
    } else if (users.includes(userInput.value)) {
      alert('User name already exists.');
    } else if (blockedUsers.includes(userInput.value)) {
      alert("The user name is blocked!");
    } else if (confirm(`"${userInput.value}" is available, click 'OK' to add.`)) {
      alert(`You have successfully added '${userInput.value}'.`)
      users.push(userInput.value);
      userInput.value = "";
      updateUser();
      updateBlockedUser();
      localStorage.setItem("usersArray", users);
    }
  } else {
    alert("Please register you name first.")
  }
}

function blockingUser() {
  if (isRegister === true) {
    if (!userInput.value) {
      userInput.style.border = "2px solid crimson";
      setTimeout(() => {
        userInput.style.border = "";
      }, 500);
      return;
    } else if (blockedUsers.includes(userInput.value)) {
      alert("The user has already been blocked.");
    } else if (confirm(`Do you really want to block "${userInput.value}".`)) {
      let matchWithUser = users.findIndex(v => { return v === userInput.value });
      if (users.includes(userInput.value)) {
        users.splice(matchWithUser, 1);
        alert(`Added to the block list.`);
        blockedUsers.push(userInput.value);
        userInput.value = '';
        updateUser();
        updateBlockedUser();
        localStorage.setItem("usersArray", users);
        localStorage.setItem("blockedArray", blockedUsers);
      } else {
        alert(`Added to the block list.`);
        blockedUsers.push(userInput.value);
        userInput.value = '';
        updateUser();
        updateBlockedUser();
        localStorage.setItem("blockedArray", blockedUsers);
      }
    }
  } else {
    alert("Please register your name.");
  }
}