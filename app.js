// all the DOM variables
const addworkout = document.getElementById("add-workout-button");
const close = document.querySelector(".close");
const modal = document.querySelector(".modal");
const mainContainer = document.getElementById('main');
const submit = document.getElementById("submit");

const myLibrary = [
  ["Bench Press", 4, 5, "Yes"],
  ["Squats", 10, 3, "No"]
];

function addWorkoutToLibrary(workout) {
    // Ensure workout is an array
    myLibrary.push(workout);
    clearMainContainer();
    displayWorkouts();
}
// Event listener for "Add Workout" button
addworkout.addEventListener('click', function() {
    modal.style.display = 'block';
  });
  function clearMainContainer() {
    // Get all children of the main container
    const children = mainContainer.children;
    
    // Loop through all children
    for (let i = 0; i < children.length; i++) {
        // Check if the current child does not have the class 'add' or the id 'add-workout-modal'
        if (!children[i].classList.contains('add') && children[i].id !== 'add-workout-modal') {
            // Remove each child that is not the 'add' div or the modal div
            mainContainer.removeChild(children[i]);
        }
    }
}
// Function to clear form fields
function clearForm() {
    document.getElementById('workout-title').value = '';
    document.getElementById('workout-reps').value = '';
    document.getElementById('workout-sets').value = '';
    document.getElementById('workout-done').value = '';
  }
  submit.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    const title = document.getElementById('workout-title').value;
    const reps = document.getElementById('workout-reps').value;
    const sets = document.getElementById('workout-sets').value;
    const done = document.getElementById('workout-done').value;
    // Form validation
    if (title === '' || reps === '' || sets === '' || done === '') {
      alert("All fields are required.");
      return;
  }

  if (isNaN(reps) || isNaN(sets)) {
      alert("Reps and sets must be numbers.");
      return;
  }

  if (done.toLowerCase() !== 'yes' && done.toLowerCase() !== 'no') {
      alert("Done must be either 'Yes' or 'No'.");
      return;
  }

    const newWorkout = [title, reps, sets, done];
    addWorkoutToLibrary(newWorkout);
    modal.style.display = 'none'; // Hide modal after submission
    clearForm(); // Clear form fields
});
  // Event listener for close button
  close.addEventListener("click", function(){
    modal.style.display = 'none';
  });
  function removeWorkout(index) {
    myLibrary.splice(index, 1); // Remove workout from myLibrary array
    clearMainContainer();
    displayWorkouts(); // Re-display workouts
}

function toggleDone(index) {
  myLibrary[index][3] = myLibrary[index][3] === "Yes" ? "No" : "Yes";
  clearMainContainer();
  displayWorkouts(); // Re-display workouts to reflect the change
}

function displayWorkouts() {
    clearMainContainer();

    myLibrary.forEach((workout, index) => {
        const workoutDiv = document.createElement("div");
        workoutDiv.className = "workouts";
        workoutDiv.id = `${index}`; // Set a unique id for each workout div

        const remove = document.createElement("button");
        remove.id = `remove-${index}`; // Set the same unique id for the remove button
        const title = document.createElement("h3");
        const reps = document.createElement("h3");
        const sets = document.createElement("h3");
        const done = document.createElement("button");

        // Extract workout details from the array
        const workoutTitle = workout[0];
        const workoutReps = workout[1];
        const workoutSets = workout[2];
        const workoutDone = workout[3];

        // Set the text content of each element
        title.textContent = "Workout: " + workoutTitle; // Set the title text content
        reps.textContent = "Reps: " + workoutReps; // Set the reps text content
        sets.textContent = "Sets: " + workoutSets; // Set the sets text content
        done.textContent = "Done: " + workoutDone; // Corrected display of done status
        remove.textContent = "Remove Workout"; // Set the remove text content

        // Add event listener to the remove button
        remove.addEventListener('click', function() {
            // Find the parent workout div and remove it
            const parentDiv = document.getElementById(workoutDiv.id);
            mainContainer.removeChild(parentDiv);
            // Remove the workout from myLibrary array
            removeWorkout(index);
        });

        // Add event listener to the done button to toggle Yes/No
        done.addEventListener('click', function() {
          toggleDone(index); // Toggle the done status
      });

        // Append elements to the workout div
        workoutDiv.appendChild(title);
        workoutDiv.appendChild(reps);
        workoutDiv.appendChild(sets);
        workoutDiv.appendChild(done);
        workoutDiv.appendChild(remove);

        // Append the workout div to the workouts container
        mainContainer.appendChild(workoutDiv);
        // Add the workouts div as the first child of the main container
        mainContainer.insertBefore(workoutDiv, mainContainer.firstChild);
    });
}

// Initial display of workouts
displayWorkouts();
console.log(myLibrary);