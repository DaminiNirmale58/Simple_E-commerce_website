let cart = [];

// Fetch products from the backend
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('pro');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <div class="stars" id="stars-${product.id}">
                        ${generateStarsHTML(product.rating)}
                    </div>
                    <h4>$${product.price}</h4>
                </div>
                <button class="button" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Generate stars HTML based on rating
function generateStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<i class="fas fa-star ${i <= rating ? 'selected' : ''}" data-rating="${i}"></i>`;
    }
    return starsHTML;
}

// Attach event listeners to stars for updating ratings
function attachStarEventListeners(products) {
    products.forEach(product => {
        const starContainer = document.getElementById(`stars-${product.id}`);
        starContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('fa-star')) {
                const newRating = parseInt(e.target.getAttribute('data-rating'));
                product.rating = newRating; // Update rating for the product
                this.innerHTML = generateStarsHTML(newRating); // Re-render stars
                console.log(`Updated rating for ${product.name}: ${newRating} stars`);
            }
        });
    });
}

// Add product to the cart
function addToCart(name, price) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    renderCart();
}

// Remove product from the cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

// Update quantity of a cart item
function updateQuantity(name, quantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = Math.max(1, quantity); // Ensure at least 1 quantity
        renderCart();
    }
}

// Render the cart
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            ${item.name} x 
            <input type="number" value="${item.quantity}" min="1" 
                onchange="updateQuantity('${item.name}', this.value)">
            - $${item.price * item.quantity}
            <button class="button remove-button" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

document.getElementById('checkout-button').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }),
        });

        if (response.ok) {
            alert('Order placed successfully!');
            cart = [];
            renderCart();
        } else {
            alert('Failed to place order.');
        }
    } catch (error) {
        console.error('Checkout error:', error);
    }
});

fetchProducts();
