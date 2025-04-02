<!-- Signin scipt -->
	
const modal = document.getElementById("signin-modal");
const signinBtn = document.getElementById("signin-btn");
const closeModal = document.getElementById("close-modal");

signinBtn.addEventListener("click", function(event) {
	event.preventDefault();
	modal.style.display = "flex";
});

closeModal.addEventListener("click", function() {
	modal.style.display = "none";
});

window.addEventListener("click", function(event) {
	if (event.target === modal) {
		modal.style.display = "none";
	}
});
