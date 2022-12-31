async function fetchproduct() {
    const product = await fetch('http://localhost:4000/server/getproducts');
     const productdata = await product.json();
    const pro = productdata.data;

    let tabledata = "";

    pro.map((values)=>{
        tabledata+= `<tr>
        <td>${values.name}</td>
        <td>${values.price}</td>
        <td>${values.company}</td>
        <td>${values.rating}</td>
        <td>${values.featured}</td>
        </tr>`;
    })

    document.getElementById("table_body").innerHTML=tabledata;

}

const element = document.getElementById("myBtn");
element.addEventListener("click", fetchproduct);

