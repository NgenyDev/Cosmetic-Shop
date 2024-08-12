document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.00, image: 'path/to/images.jpg' },
        { id: 2, name: 'Product 2', price: 20.00, image: 'path/to/image2.jpg' },
        { id: 3, name: 'Product 3', price: 30.00, image: 'path/to/image3.jpg' }
    ];
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productsContainer = document.querySelector('.list');
    const cartContainer = document.querySelector('.listCard');
    const quantitySpan = document.querySelector('.quantity');
    const totalDiv = document.querySelector('.total');

    function displayProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    function displayCart() {
        cartContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItemDiv = document.createElement('li');
            cartItemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
        totalDiv.textContent = `Total: $${total.toFixed(2)}`;
        quantitySpan.textContent = cart.length;
    }

    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    window.updateQuantity = function(id, change) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    displayProducts();
    displayCart();
});
