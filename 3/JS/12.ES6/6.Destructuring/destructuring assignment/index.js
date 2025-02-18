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
const {id, name: { first, last }, email,
address: { 
    shipping: { street, city, state, postalcode, country }, 
    billing: { street: street2, city: city2, state: state2, postalCode: postalcode2, country: country2 } 
    },
    payment: {transactions}
}= user;
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
    <p>${street}, ${city}, ${state}, ${postalcode}, ${country}</p>
`;

// Display Billing Address
document.getElementById('billing-address').innerHTML = `
    <h2>Billing Address</h2>
    <p>${street2}, ${city2}, ${state2}, ${postalcode2}, ${country2}</p>
`;

// Display Transactions List
const transactionList = document.getElementById('transaction-list');
transactions.forEach(transactions => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${transactions.description}</strong> - $${transactions.amount} (ID: ${transactions.id})`;
    transactionList.appendChild(li);
});
