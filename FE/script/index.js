const clintIo = io('http://localhost:3000')


clintIo.emit("saveSocketId" , "639480a0df10f41f21c1e573")
// clintIo.emit("FETOBE" , "From FE to BEs")

// clintIo.on('BETOFE' , (data)=>{
//     console.log(data);
// })

// const data = {
//     message: "Hi",
//     sId: "LURXlPiTE59LWoFcAAAH"
// }
// clintIo.emit("privateMessage", data)

// clintIo.on('reply', (data) => {
//     console.log(data);
// })


clintIo.on("returnProductList", (data) => {
    console.log(data);
    displayData(data)
})


function displayData(products) {

    let cartona = ``
    for (const product of products) {
        cartona += `
        <div class="col-md-4 my-2 p-2">
        <div class="">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}</p>
                </div>
            </div>
        </div>
    </div>`
    }
    $("#rowData").html(cartona)
}
$("#addProduct").click(() => {

    const data = {
        title: $("#title").val(),
        price: $("#price").val(),
        description: $("#desc").val(),
   
    }
    clintIo.emit("addProduct", data)
    // clintIo.emit("requestProducts")

})



