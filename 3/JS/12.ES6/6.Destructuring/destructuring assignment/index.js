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
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" }
        ]
    }
};

const {id, name: {first, last}, email, address:{shipping:{street,city,state,postalcode,country},billing:{street:street2,city:city2,state:state2,postalCode:postalcode2,country:country2}},payment:{transactions}} = user
console.log(transactions[0])


document.getElementById('personal-info').innerHTML = `User Details: ${id} ${first} ${last} ${email}`
document.getElementById('shipping-address').innerHTML = `Shipping-address ${street} ${city} ${state} ${postalcode} ${country}`
document.getElementById('billing-address').innerHTML = `Billing-address ${street2} ${city2} ${state2} ${postalcode2} ${country2}`
// document.getElementById('transactions').innerHTML = `${transactions}`


const transactionsMapped = transactions.map((transactions)=>{
    return `Transactions:  ${transactions.id} ${transactions.amount} ${transactions.description}`
})

document.getElementById('transactions').innerHTML = transactionsMapped

