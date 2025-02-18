const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            { id: "TXN-123", amount: "50.00", description: "Magic Potion" },
            { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" }
        ]
    }
};

// Destructuring user data
const { id, name: { first, last }, email, address: { shipping, billing }, payment: { transactions } } = user;

// Display Personal Information
document.getElementById('personal-info').innerHTML = `
    <h2>Personal Information</h2>
    <p><strong>User ID:</strong> ${id}</p>
    <p><strong>Name:</strong> ${first} ${last}</p>
    <p><strong>Email:</strong> ${email}</p>
`;

// Display Shipping Address
document.getElementById('shipping-address').innerHTML = `
    <h2>Shipping Address</h2>
    <p>${shipping.street}, ${shipping.city}, ${shipping.state}, ${shipping.postalCode}, ${shipping.country}</p>
`;

// Display Billing Address
document.getElementById('billing-address').innerHTML = `
    <h2>Billing Address</h2>
    <p>${billing.street}, ${billing.city}, ${billing.state}, ${billing.postalCode}, ${billing.country}</p>
`;

// Display Transactions List
const transactionList = document.getElementById('transaction-list');
transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${transaction.description}</strong> - $${transaction.amount} (ID: ${transaction.id})`;
    transactionList.appendChild(li);
});
