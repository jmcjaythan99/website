<!-- Quick View Modal -->

document.addEventListener("DOMContentLoaded", function () {
	console.log("JavaScript loaded!"); // Debugging check

	const cartSidebar = document.getElementById("sidebar-cart");
	const cartOverlay = document.getElementById("cart-overlay");
	const closeCartBtn = document.getElementById("close-cart");
	const addToCartButtons = document.querySelectorAll(".product-card .add-to-cart");
	const quickViewButtons = document.querySelectorAll(".quick-view");
	const cartCount = document.getElementById("cart-count");
	const cartTotal = document.getElementById("cart-total");
	const cartItemsContainer = document.getElementById("cart-items");

	// Quick View Modal Elements
	const quickViewModal = document.getElementById("quickview-modal");
	const quickViewClose = document.querySelector(".quickview-close");
	const quickViewImage = document.getElementById("quickview-img");
	const quickViewTitle = document.getElementById("quickview-title");
	const quickViewDescription = document.getElementById("quickview-description");
	const quickViewPrice = document.getElementById("quickview-price");
	const quickViewAddToCart = document.querySelector("#quickview-modal .add-to-cart");

	let cart = [];

	// Function to open the cart sidebar
	function openCart() {
		console.log("Opening cart...");
		cartSidebar.classList.add("open");
		cartOverlay.classList.add("show");
	}

	// Function to close the cart sidebar
	function closeCart() {
		console.log("Closing cart...");
		cartSidebar.classList.remove("open");
		cartOverlay.classList.remove("show");
	}

	// Function to update the cart UI
	function updateCart() {
		console.log("Updating cart...");
		cartItemsContainer.innerHTML = "";
		let total = 0;
		let itemCount = 0;

		cart.forEach(item => {
			total += item.price * item.quantity;
			itemCount += item.quantity;

			const li = document.createElement("li");
			li.innerHTML = `
				<div style="display:flex; align-items:center; gap:10px;">
					<img src="${item.image}" width="50" height="50" style="border-radius:5px; object-fit:cover;">
					<div>
						<p>${item.name}</p>
						<p>₱${item.price} x ${item.quantity}</p>
					</div>
				</div>
			`;
			cartItemsContainer.appendChild(li);
		});

		cartCount.innerText = itemCount;
		cartTotal.innerText = total.toFixed(2);
	}

	// Handle "Add to Cart" from product cards
	addToCartButtons.forEach(button => {
		button.addEventListener("click", function () {
			console.log("Add to Cart clicked from product card!");

			const productCard = button.closest(".product-card");
			const productName = productCard.querySelector(".product-info h3").innerText;
			const productPrice = parseFloat(productCard.querySelector(".product-info p").innerText.replace("₱", ""));
			const productImage = productCard.querySelector("img").src;

			addItemToCart(productName, productPrice, productImage);
		});
	});

	// Handle "Add to Cart" from Quick View modal
	quickViewAddToCart.addEventListener("click", function () {
		console.log("Quick View Add to Cart clicked!");

		const productName = quickViewTitle.innerText;
		const productPrice = parseFloat(quickViewPrice.innerText.replace("₱", ""));
		const productImage = quickViewImage.src;

		addItemToCart(productName, productPrice, productImage);
	});

	// Function to add items to cart
	function addItemToCart(name, price, image) {
		const existingItem = cart.find(item => item.name === name);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.push({ name, price, image, quantity: 1 });
		}

		updateCart();
		openCart();
	}

	// Close cart when clicking outside or the close button
	closeCartBtn.addEventListener("click", closeCart);
	cartOverlay.addEventListener("click", closeCart);

	// Handle "Quick View" clicks
	quickViewButtons.forEach(button => {
		button.addEventListener("click", function () {
			console.log("Quick View clicked!");

			const productCard = button.closest(".product-card");
			const productImage = productCard.querySelector("img").src;
			const productName = productCard.querySelector(".product-info h3").innerText;
			const productPrice = productCard.querySelector(".product-info p").innerText;
			const productDescription = productCard.getAttribute("data-description");

			// Update modal content
			quickViewImage.src = productImage;
			quickViewTitle.innerText = productName;
			quickViewPrice.innerText = productPrice;
			quickViewDescription.innerText = productDescription ? productDescription : "No description available.";

			// Show the modal
			quickViewModal.style.display = "block";
		});
	});

	// Close Quick View Modal
	quickViewClose.addEventListener("click", function () {
		quickViewModal.style.display = "none";
	});

	// Close Quick View Modal when clicking outside
	window.addEventListener("click", function (event) {
		if (event.target === quickViewModal) {
			quickViewModal.style.display = "none";
		}
	});
});
