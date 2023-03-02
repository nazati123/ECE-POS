fetch("orders.json")
.then(function(response){
    return response.json();
})
.then(function(products){
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for(let order of orders){
        //backticks allow for HTML
        out += ` 
        <tr>
            <td>${order.ClubName}</td>
            <td>${order.price}</td>
            <td>${order.OrderID}</td>
            <td>${order.Status}</td>
        </tr>
        `;
    }
    placeholder.innerHTML = out;
});
