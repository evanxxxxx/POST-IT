// Firebase api configuration:
const firebaseConfig = { 
    

};

// to Initialize Firebase
firebase.initializeApp(firebaseConfig);

// to Get a reference to the Firebase authentication service
const auth = firebase.auth();

// this is a  user registration form
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const name = registerForm.name.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  // to Create a new user account with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // to Update user profile with the provided name
      const user = userCredential.user;
      user.updateProfile({
        displayName: name
      }).then(() => {
        //to  Redirect to the home page after registration
        window.location.href = '/home.html';
      });
    })
    .catch((error) => {
      console.error(error);
      // to Display an error message to the user if conditions arent met
      alert(error.message);
    });
});

// User login form
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // to Sign in user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      //to  Redirect to the home page after login
      window.location.href = '/home.html';
    })
    .catch((error) => {
      console.error(error);
      // Display an error message to the user
      alert(error.message);
    });
});

// Check if the user is logged in on page load
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is logged in, redirect to the home page
    window.location.href = '/home.html';
  }
});
// an array to store the post-its
let postIts = [];

//  a function to create a new post-it
function createPostIt(message) {
  // a unique ID for the post-it
  let id = Date.now().toString();

  // to Create a new post-it object with the given message and ID
  let postIt = {
    id: id,
    message: message,
    
  };

  // Add the new post-it to the array
  postIts.push(postIt);

  // Return the ID of the new post-it
  return id;
}

// Define a function to search for post-its by keyword
function searchPostIts(keyword) {
  // Filter the array of post-its by whether the keyword appears in the message
  let results = postIts.filter(postIt => {
    return postIt.message.includes(keyword) || postIt.file.name.includes(keyword);
  });

  //to Return the matching post-its
  return results;
}
//  an array to store comments, and user data

let comments = [];
let userData = {};

// Function to add a post-it in profile 
function addPostIt(postIt) {
  postIts.push(postIt);
}

// Function to add a comment to a post-it
function addComment(comment) {
  comments.push(comment);
}

// Function to view a user's profile
function viewProfile(username) {

  // to Check if the user exists in the userData object
  if (userData.hasOwnProperty(username)) {
    
    //to  Display the user's profile information
    console.log(`Username: ${userData[username].username}`);
    console.log(`Full Name: ${userData[username].fullName}`);
    console.log(`Email: ${userData[username].email}`);
    console.log(`Post-Its: ${userData[username].postIts}`);
    console.log(`Comments: ${userData[username].comments}`);
  } else {
    console.log(`User '${username}' does not exist.`);
  }
}

// Function to edit a user's profile
function editProfile(username, fullName, email) {
  
    // Check if the user exists in the userData object
  if (userData.hasOwnProperty(username)) {
    
    // to Update the user's profile information
    userData[username].fullName = fullName;
    userData[username].email = email;
    console.log(`Profile updated successfully.`);
  } else {
    console.log(`User '${username}' does not exist.`);
  }
}

// Function to view a user's post-its and replies
function viewPostIts(username) {
  
    // Check if the user exists in the userData object
  if (userData.hasOwnProperty(username)) {
    // Display the user's post-its and replies
    console.log(`Post-Its:`);
    userData[username].postIts.forEach(postIt => {
      console.log(`- ${postIt}`);
    });
    console.log(`Comments:`);
    userData[username].comments.forEach(comment => {
      console.log(`- ${comment}`);
    });
  } else {
    console.log(`User '${username}' does not exist.`);
  }
}

// Example of this usage or scenario
/*addPostIt("Buy food");
addComment("Don't forget water");
addPostIt("going home");
addComment("safe journey");
addComment("thanks");
userData["TappiNwa"] = {
  username: "PalmwineTapper",
  fullName: "Tappi Nwa",
  email: "Tappichukwu@learnable.com",
  postIts: ["buy food", "going home"],
  comments: ["Don't forget water", "safe journey"]
};
viewProfile("TappiNwa");
viewPostIts("TappiNwa");*/





/*<div id="post-it">
  <h2>Original Post-It</h2>
  <p>This is the original post-it text.</p>
  <h3>Comments</h3>
  <ul id="comments-list"></ul>
  <h3>Add a comment</h3>
  <form id="comment-form">
    <textarea id="comment-text"></textarea>
    <button type="submit">Add comment</button>
  </form>
</div>


const postIt = document.querySelector('#post-it');
const commentsList = postIt.querySelector('#comments-list');
const commentForm = postIt.querySelector('#comment-form');
const commentText = postIt.querySelector('#comment-text');

// Handle adding a new comment
commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const comment = document.createElement('li');
  comment.innerText = commentText.value;
  commentsList.appendChild(comment);
  commentText.value = '';
});

// Handle adding a new post-it
const newPostItForm = document.createElement('form');
newPostItForm.innerHTML = `
  <h3>Add a new post-it</h3>
  <textarea id="post-it-text"></textarea>
  <button type="submit">Add post-it</button>
`;
postIt.appendChild(newPostItForm);

newPostItForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newPostIt = document.createElement('div');
  newPostIt.innerHTML = `
    <h2>New Post-It</h2>
    <p>${newPostItForm.querySelector('#post-it-text').value}</p>
    <h3>Comments</h3>
    <ul></ul>
    <h3>Add a comment</h3>
    <form>
      <textarea></textarea>
      <button type="submit">Add comment</button>
    </form>
  `;
  postIt.parentNode.insertBefore(newPostIt, postIt.nextSibling);
// }*/