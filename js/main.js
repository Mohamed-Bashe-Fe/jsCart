// setup variable
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let productCategory = document.querySelector("#productCategory");
let productDescribtion = document.querySelector("#productDescribtion");
let count = document.querySelector("#count");
let searchByName = document.querySelector("#searchByName");
let tFoot = document.querySelector("#tfoot");

let addBtn = document.querySelector("#add_btn");
let deleteAll = document.querySelector("#delete_all");


// Is the localstorage empty, if it is not empty, let it be equal to the data in the array, if it is empty, let it be equal to an empty array
let productItem ;
if(localStorage.getItem("ourProduct") == null){
    productItem = [];
}else{
    productItem = JSON.parse(localStorage.getItem("ourProduct"));
    displayItem();
}

addBtn.addEventListener('click' , AddProduct);
deleteAll.addEventListener('click' , deleteAllData);

// creat a dummy variable In order to control the function of the button, does it add a product or modify the product
let mood = "add product";

// I created a dummy variable equal to i so that I can use it anywhere
let temp;





function AddProduct(e){
    // object contain input value
    let product = {
        name : productName.value , 
        price : productPrice.value,
        categ : productCategory.value,
        disc : productDescribtion.value,
        count : count.value,
        countItem : 1
    }


    if(mood === "add product"){
        // if input data null stop running code else check count >1 creat element == count else creat one element
        if(product.name == "" || product.price =="" || product.categ == "" || product.disc == ""){
            e.peventDefault();
        }else{
            if(!productItem.length){
                        
                productItem.push(product);
            }else{

                productItem.forEach(item => {
                    if(item.name === product.name){
                        ++item.countItem 
                        console.log(productItem , product)
                    }else{
                        productItem.push(product);
                        console.log(productItem , product)
    
                    }
                });
            }


        }
    }else{
        productItem[temp] = product;
        mood = "add product";
        addBtn.innerHTML = "add product";

    }

    // save data in localstoreage
    localStorage.setItem("ourProduct", JSON.stringify(productItem));

    displayItem();
    // clearInput();
}




// show input data in tBody element
function displayItem(){
    let productList = "";
    let footer = "";
    let x = 0;
    for(let i = 0 ; i < productItem.length ; i++ ){
        
        productList += `
        <tr>
            <td>${[i+1]}</td>
            <td>${productItem[i].name}</td>
            <td>${productItem[i].price}</td>
            <td>${productItem[i].categ}</td>
            <td>${productItem[i].disc}</td>
            <td><button class="btn btn-warning" onclick="deleteitem(${i})"> delete </button> </td>
            <td><button class="btn btn-success" onclick="EditeItem(${i})"> edite </button> </td>
        </tr>
        `

        x += +productItem[i].price;

        footer = `
        <tr>
            <td>ToTal</td>
            <td>_</td>
            <td>${x}</td>
            <td>_</td>
            <td>_</td>
            <td>_</td>
            <td>_</td>
        </tr>
        `
        

    }
    document.querySelector("#tBody").innerHTML = productList;
    document.querySelector("#tfoot").innerHTML = footer;
}






// clear input after clicked btn add product  
function clearInput(){
    productName.value  = "", 
    productPrice.value = "",
    productCategory.value = "",
    productDescribtion.value = "",
    count.value = ""
}



// delete all item 

function deleteAllData(){
    // document.querySelector("#tBody").innerHTML = "";
    productItem.splice(0);
    displayItem();
}


// delete one item when click on btn
function deleteitem(id){
    productItem.splice(id,1);
    displayItem();
}


// edite item when click on btn 
function EditeItem(i){
    productName.value = productItem[i].name;
    productPrice.value = productItem[i].price;
    productCategory.value = productItem[i].categ;
    productDescribtion.value = productItem[i].disc;

    addBtn.innerHTML = "update";
    mood = "update";
    temp = i;

}


// search by using name

let searchBtn = document.querySelector("#search");
searchBtn.addEventListener('click' , getSearch)
function getSearch(){
    let productList = "";
    for(let i = 0; i<productItem.length;i++){
        if(productItem[i].name.includes(searchByName.value)){
            productList += `
                <tr>
                    <td>${[i+1]}</td>
                    <td>${productItem[i].name}</td>
                    <td>${productItem[i].price}</td>
                    <td>${productItem[i].categ}</td>
                    <td>${productItem[i].disc}</td>
                    <td><button class="btn btn-danger" onclick="deleteitem(${i})"> delete </button> </td>
                    <td><button class="btn btn-danger" onclick="EditeItem(${i})"> edite </button> </td>
                </tr>
                `
        }
    }

    document.querySelector("#tBody").innerHTML = productList;
    searchByName.value = "";
}


