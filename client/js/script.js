// Yanas code

$(document).ready(function(){
  console.log(sessionStorage);
  var url;
  // get url and port from config.json
  $.ajax({
    url :'config.json',
    type :'GET',
    dataType :'json',
    success : function(configData){
      // url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      url = configData.SERVER_URL + ":" + configData.SERVER_PORT;
      console.log(url);
      generateLandingPageCards();
    },//success
    error:function(){
      // console.log('error: cannot call api');
    }//error
  });//ajax



// Show and hide pages ===============================================================
// Yanas code

//check if there is any session sessionStorage
if (sessionStorage.usersName) {
  // buttons
  $('#logoutBtn').show();
  $('#myPortfolioBtn').show();
  $('#loginBtn').hide();
  $('#signUpBtn').hide();
  showMemberName(sessionStorage.usersName);
  // pages
  $('#landingPage').show();
  $('#viewMorePage').hide();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();
} else {
  // buttons
  $('#logoutBtn').hide();
  $('#myPortfolioBtn').hide();
  $('#loginBtn').show();
  $('#signUpBtn').show();
  // pages
  $('#landingPage').show();
  $('#viewMorePage').hide();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();
}

//Home button to show landing page
$('#homeBtn').click(function(){
  // pages
  $('#landingPage').show();
  $('#viewMorePage').hide();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();
});

//Login button to show login page
$('#loginBtn').click(function(){
  // pages
  $('#loginPage').show();
  $('#landingPage').hide();
  $('#viewMorePage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();
});


//signup button to shoe register page
$('#signUpBtn').click(function(){
  // pages
  $('#signUpPage').show();
  $('#projectPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#viewMorePage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();
});

// my portfolio button to show my portfolio page
$('#myPortfolioBtn').click(function(){
  generateMyPortfolios();
  getMyAccountInfo();
  // pages
  $('#projectPage').show();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#viewMorePage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();
});

//upload projects button to show upload project page
$('#addPortfolio').click(function(){
  // pages
  $('#uploadPortfolioPage').show();
  $('#projectPage').hide();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#viewMorePage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();

});

// back button to my portfolio page
$('.back-portfolio').click(function(){
  // pages
  $('#projectPage').show();
  $('#uploadPortfolioPage').hide();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#viewMorePage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').hide();
});

//update projects button to show update project page
$('#updateProject').click(function(){
  // pages
  $('#uploadPortfolioPage').hide();
  $('#projectPage').hide();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#viewMorePage').hide();
  $('#updatePortfolioPage').show();
  $('#deletePortfolioPage').hide();
});

// delete projects button to show delete project page
$('#deleteProject').click(function(){
  // pages
  $('#uploadPortfolioPage').hide();
  $('#projectPage').hide();
  $('#signUpPage').hide();
  $('#loginPage').hide();
  $('#landingPage').hide();
  $('#viewMorePage').hide();
  $('#updatePortfolioPage').hide();
  $('#deletePortfolioPage').show();
});


// Logout member ===============================================================
// Yanas code

$('#logoutBtn').click(function(){
  sessionStorage.clear();
  $('#landingPage').show();
  $('#loginPage').hide();
  $('#signUpPage').hide();
  $('#projectPage').hide();
  $('#uploadPortfolioPage').hide();
  $('#updatePortfolio').hide();
  location.reload("#loginForm");
});

// view all members button ===============================================================
// Yanas code

$('#viewMembersBtn').click(function(){
  $.ajax({
    url : `${url}/allMembers`,
    type : 'GET',
    dataType : 'json',
    success : function(membersFromMongo){
      console.log(membersFromMongo);
      $('#membersCards').empty();
      document.getElementById('membersCards').innerHTML +=
      '<h2 class="pt-5 pb-4">All Members</h2>';
      for(let i = 0; i <membersFromMongo.length; i ++ ){
        document.getElementById('membersCards').innerHTML +=
        `<div class="col mt-3">
        <h4> ${membersFromMongo[i].username}</h4>
        </div>`;
      }
    },
    error:function() {
      // console.log('ERROR: cannot call API');
    }//error

  });//ajax
});

// register member ===============================================================
// Yanas code

// register user
$('#registerForm').submit(function(){
  event.preventDefault();
  let username = $('#registerUsername').val();
  let email = $('#registerEmail').val();
  let password = $('#registerPassword').val();
  $.ajax({
    url :`${url}/registerMember`,
    type :'POST',
    data:{
      username : username,
      email : email,
      password : password
    },
    success : function(member){
      if (member !== 'Username already taken. Please try another one') {
        alert ('Please login to add artwork and buy art');
        $('#loginBtn').show();
        $('#registerBtn').hide();
      } else {
        alert('Username already taken. Please try another one');
        $('#registerUsername').val('');
        $('#registerEmail').val('');
        $('#registerPassword').val('');
      }
    },//success
    error:function(){
      // console.log('error: cannot call api');
    }//error

  });//ajax
});//submit function for register form

// login member ===============================================================
// Yanas code

$('#loginSubmitBtn').click(function(){
  event.preventDefault();
  let username = $('#inputUsernameLogin').val();
  let password = $('#inputPasswordLogin').val();

  $.ajax({
    url :`${url}/loginMember`,
    type :'POST',
    data:{
      username : username,
      password : password
    },
    success : function(loginData){
      if (loginData === 'Please fill in all input fields') {
        alert('Please fill in all input fields');
      } else if (loginData === 'Member not found. Please register') {
        alert('Register please');
      } else if (loginData === 'Not Authorized') {
        alert('Incorrect Password');
      }  else {
        sessionStorage.setItem('memberId',loginData._id);
        sessionStorage.setItem('usersName',loginData.username);
        sessionStorage.setItem('userEmail',loginData.email);
        showMemberName(username);
        $('#logoutBtn').show();
        $('#myPortfolioBtn').show();
        $('#loginBtn').hide();
        $('#signUpBtn').hide();
        $('#landingPage').show();
        $('#loginPage').hide();
        $('html, body').animate({ scrollTop: 0 }, 'fast');

      }
    },//success
    error:function(){
      // console.log('error: cannot call api');
    }//error
  });//ajax
});

// show members name ===========================================================
// Yanas code
function showMemberName(name){
  document.getElementById('memberName').innerHTML = '<b>' + name + '</b>';
}

// add portfolio form ===============================================================
// Yanas code

$('#addPortfolioForm').submit(function(){
  event.preventDefault();
  if( ! sessionStorage.memberId){
    alert('401, permission denied');
    return;
  }
  let title = $('#addPortfolioTitle').val();
  let description = $('#addPortfolioDescription').val();
  let image = $('#addPortfolioImage').val();
  let category = $('#addPortfolioCategory').val();
  let price = $('#addPortfolioPrice').val();
  let memberId = $('#addPortfolioMemberId').val();

  if (title == '' || description == '' || image == '' || category == '' || price == '' || memberId == ''){
    alert('Please enter all details');
  } else {
    $.ajax({
      url :`${url}/addPortfolio`,
      type : 'POST',
      data : {
        title : title,
        description : description,
        image : image,
        category : category,
        price: price,
        memberId : sessionStorage.getItem('memberId')
      },
      success : function(portfolio){
        if (portfolio !== 'Title taken already, please try another one') {
          alert('Added the portfolio');
        } else {
          alert('Title taken already, please try another one');
        }
        $('#addPortfolioTitle').val();
        $('#addPortfolioDescription').val();
        $('#addPortfolioImage').val();
        $('#addPortfolioCategory').val();
        $('#addPortfolioPrice').val();
        $('#addPortfolioMemberId').val();

        $('#addPortfolioForm').trigger('reset');
        $('#uploadPortfolioPage').hide();
        $('#landingPage').show();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
      },   // success
      error:function(){
        // console.log('error: cannot call api');
      }  //error
    }); //ajax
  } //else
}); // submit add portfolio

// View my portfolio project cards =============================================

// Hayley's code
function generateMyPortfolios() {
  let currentUserId = sessionStorage.getItem('memberId');

  if (!currentUserId) { return; }

  $.ajax({
    url: `${url}/myPortfolios/${currentUserId}`,
    type: 'GET',
    success: function(results) {
      console.log(results);
      if (results === "No portfolio by this user found") {
        document.getElementById('myProjectCards').innerHTML = `
        <div class="noPortfolio text-center">You have not upload any project yet!</div>
        `;
        return;
      }
      makePortfolioCards(results);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getMyAccountInfo() {
  let currentUserId = sessionStorage.getItem('memberId');

  if (!currentUserId) { return; }

  $.ajax({
    url: `${url}/myAccountInfo/${currentUserId}`,
    type: 'GET',
    dataType: 'json',
    success: function(result) {
      console.log(result);
      generateAccountSummaryHTML(result);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function generateAccountSummaryHTML(account) {
  document.getElementById('memberAccount').innerHTML = `
  <div class="flexContainer-flexStart mb-1">
    <strong class="userInfoField">Username:</strong>
    <div>${account.username}</div>
  </div>
  <div class="flexContainer-flexStart mb-1">
    <strong class="userInfoField">Email:</strong>
    <div>${account.email}</div>
  </div>
  <div class="flexContainer-flexStart mb-1">
    <strong class="userInfoField">About:</strong>
    <div>${account.about}</div>
  </div>
  <div class="flexContainer-flexStart mb-1">
    <strong class="userInfoField">Location:</strong>
    <div>${account.location}</div>
  </div>
  <div class="flexContainer-flexStart mb-1">
    <strong class="userInfoField">Website:</strong>
    <a>${account.website}</a>
  </div>
  `;
}

function makePortfolioCards(arr) {
  document.getElementById('myProjectCards').innerHTML = arr.map(item => `
    <div class="card portfolioCard border-bottom">
    <div style="background-image:url(${item.image})" class="portfolioPage-image mb-3"></div>
    <h5 class="card-text mb-3">${item.title}</h5>
    <div class="portfolioPage-buttonsWrapper">
    <div class="portfolioPage-buttonGroup">
    <div class="button viewMoreButton btn-font" id="${item._id}">View</div>
    <div class="button-black editButton btn-font" id="${item._id}">Edit</div>
    </div>
    <div class="button-red deleteButton btn-font" id="${item._id}">Delete</div>
    </div>
    </div>
    `).join(' ');

    let viewMoreButtons = document.getElementsByClassName('viewMoreButton');

    for (let i = 0; i < viewMoreButtons.length; i ++) {
      viewMoreButtons[i].addEventListener('click', getArtworkInfo);
    }
  }

  function generateLandingPageCards() {
    $.ajax({
      url: `${url}/portfoliosAndAuthors`,
      type: 'GET',
      dataType: 'json',
      success: function(portfolios) {
        makeProductCards(portfolios);
      },
      error: function(error) {
        console.log('Error: ' + error);
      }
    });
  }

  function makeProductCards(arr) {
    document.getElementById('artsDeck').innerHTML = arr.map(art =>
      `<div class="col-sm-12 col-md-6 col-lg-4 my-xs-1 my-sm-1 my-md-3 my-lg-3">
      <div class="card card-border rounded-0 mb-4">

      <img src="${art.image}" alt="Avatar" class="card-img-top radius">

      <div class="card-body artcard-body mx-1 my-1">
      <div class="artcard-columnwrap">
      <h4 class="card-title artcard-title mb-3">${art.title}</h4>
      <h5 class="card-title artcard-price">&dollar;${art.price}</h5>
      </div>
      <p class="card-title"><b>${art.authorInfo.username}, ${art.authorInfo.location}</b></p>
      <p class="mb-3 text-truncate">${art.description}</p>
      <a href="${art.authorInfo.website}" class="card-link artcard-link">Artist Website</a>
      <div class="artcard-columnwrap mt-4">
      <p class="card-title h5-cyan">${art.category}</p>
      <div class="button viewMoreButton btn-font" id="${art._id}">View</div>
      </div>
      </div>

      </div>
      </div>`
    ).join(' ');

    let viewMoreButtons = document.getElementsByClassName('viewMoreButton');
    for (let i = 0; i < viewMoreButtons.length; i++) {
      viewMoreButtons[i].addEventListener('click', getArtworkInfo);
    }
  }

  function getArtworkInfo(e) {
    let id = e.target.id;
    $.ajax({
      url: `${url}/portfolioWithAuthor/${id}`,
      type: 'GET',
      dataType: 'json',
      success: function(portfolio) {
        generateViewMoreHTML(portfolio[0]);
        sessionStorage.setItem('currentPortfolio', portfolio[0]._id);
        $("#viewMorePage").show();
        $("#projectPage").hide();
        $("#landingPage").hide();
        if (portfolio[0].comments.length === 0) {
          document.getElementById('viewMorePage-comments').innerHTML = `
          <div class="text-center">There has not been any question about this artwork</div>
          `;
          return;
        }
        generateCommentsHTML(portfolio[0].comments);
      },
      error: function(error) {
        console.log('Error: ' + error);
      }
    });
  }

  function generateViewMoreHTML(portfolio) {

    document.getElementById('viewMorePage-artInfo').innerHTML = `
    <div>
    <h5 class="h3">${portfolio.title}</h5>
    <div class="viewMore-photoBackground">
    <img src="${portfolio.image}" class="viewMore-mainPhoto" alt="${portfolio.title} photo">
    </div>
    <div class="flexContainer-row mt-3 mb-3">
    <h5 class="h4">${portfolio.authorInfo.username}</h5>
    <h5 class="card-title h4 artcard-price">&dollar;${portfolio.price}</h5>
    </div>
    <p>${portfolio.description}</p>
    <strong class="mb-5">Location: ${portfolio.authorInfo.location}</strong>
    <br/>
    <a href="${portfolio.authorInfo.website}" class="artcard-link">${portfolio.authorInfo.website}</a>
    <div class="artcard-columnwrap mt-5 viewMore-endBoarder">
    <p class="card-title h5-cyan">${portfolio.category}</p>
    <div class="bg-info text-white radius py-2 px-3 btn-font" id="${portfolio._id}">Buy Now</div>
    </div>
    <button id="backToLanding" type="button" class="btn btn-dark mt-3 mb-5 btn-font radius">Back</button>
    </div>
    `;
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    document.getElementById('backToLanding').addEventListener('click', function() {
      $("#viewMorePage").hide();
      $("#landingPage").show();
      sessionStorage.removeItem('currentPortfolio');
    });
  }

  function generateCommentsHTML(comments) {
    let currentUser = sessionStorage.getItem('usersName');
    for (let i = 0; i < comments.length; i++) {
      if (currentUser && (comments[i].postByUsername === currentUser)) {
        document.getElementById('viewMorePage-comments').innerHTML += `
        <div class="comment-container comment-right mb-3">
        <div class="comment-info">
        <strong class="mr-1">You</strong>
        <p>on ${formatDate(comments[i].posted)}</p>
        </div>
        <p><b>${comments[i].text}</b></p>
        </div>
        `;
      } else if (comments[i].postByUsername !== currentUser) {
        document.getElementById('viewMorePage-comments').innerHTML += `
        <div class="comment-container comment-left mb-3">
        <div class="comment-info">
        <strong class="mr-1">${comments[i].postByUsername}</strong>
        <p>on ${formatDate(comments[i].posted)}</p>
        </div>
        <p>${comments[i].text}</p>
        </div>
        `;
      }
    }
  }

  document.getElementById("filterButton").addEventListener('click', getFilteredArtworks);

  function getFilteredArtworks() {
    let minPrice = (JSON.parse($("#filterDropdown-byPrice").val())).min;
    let maxPrice = (JSON.parse($("#filterDropdown-byPrice").val())).max;
    let category = $("#filterDropdown-byCategory").val();

    $.ajax({
      url: `${url}/filterPortfolios/${minPrice}/${maxPrice}/${category}`,
      type: 'GET',
      success: function(response) {
        console.log(response);
        if (response === 'Sorry, there is no artwork that matches your search!') {
          document.getElementById('artsDeck').innerHTML = `
          <div class="noResultText-wrapper">
          <h3 class="noResultText">Sorry, there is no artwork that matches your search!</h3>
          </div>
          `;
        } else {
          makeProductCards(response);
        }
      },
      error: function(error) {
        console.log('Error: ' + error);
      }
    });
  }

  document.getElementById('viewMorePage-postCommentButton').addEventListener('click', postComment);

  function postComment() {
    let _content = $('textarea#viewMorePage-postComment').val();
    let _date = Date.now();
    let _portfolioID = sessionStorage.getItem('currentPortfolio');
    let _userID = sessionStorage.getItem('memberId');
    let _username = sessionStorage.getItem('usersName');

    $.ajax({
      url: `${url}/addComment`,
      type: 'POST',
      data: {
        portfolioID: _portfolioID,
        postByID: _userID,
        postByUsername: _username,
        postDate: _date,
        content: _content
      },
      success: function(comment) {
        $('textarea#viewMorePage-postComment').val('');
        addComment(comment);
      },
      error: function(err) {
        console.log(err);
      }

    });
  }

  function formatDate(datestring) {
    let date = new Date(datestring);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = (date.getMinutes()<10?'0':'') + date.getMinutes();

    return `${day}/${month}/${year} at ${hour}:${minute}`;
  }

  function addComment(comment) {
    let commentHtml = `
    <div class="comment-container mb-3">
    <div class="comment-info">
    <strong class="mr-1">You</strong>
    <p>on ${formatDate(comment.posted)}</p>
    </div>
    <p>${comment.text}</p>
    </div>
    `;
    document.getElementById('viewMorePage-comments').innerHTML += commentHtml;
  }

  // Hayley's code ends
}); // Document ready ends
