<!-- Add To Cart Sidebar -->
document.addEventListener("DOMContentLoaded", function () {
	const addToCartButtons = document.querySelectorAll(".add-to-cart");
	const cartSidebar = document.querySelector(".cart-sidebar");
	const cartOverlay = document.querySelector(".cart-overlay");
	const closeCartButton = document.querySelector(".close-cart");

	addToCartButtons.forEach(button => {
		button.addEventListener("click", function () {
			cartSidebar.classList.add("open");
			cartOverlay.classList.add("show");
		});
	});

	if (closeCartButton) {
		closeCartButton.addEventListener("click", function () {
			cartSidebar.classList.remove("open");
			cartOverlay.classList.remove("show");
		});
	}

	cartOverlay.addEventListener("click", function () {
		cartSidebar.classList.remove("open");
		cartOverlay.classList.remove("show");
	});
});

