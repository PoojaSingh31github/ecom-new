let template=window.location.pathname.split('/')
template=template[template.length -1].replace('.html','')
const Products=All_PRODUCTS.filter(product=>product.template.split(' ').includes(template))
let level=window.location.pathname.split('/ecom')
level=level[1].split('/').length - 1
paths={
    1:'./assets/img/',
    2:'./../assets/img/',
    3:'./../../assets/img/',
}


// Mini Cart JS goes here 
let wrapper = document.querySelector('[data-product-wrapper]')
let collectionProductCound=document.querySelector('.product-count')




// Mini Cart Ends here


const animationClasses=['animate__backInDown','animate__backInLeft','animate__backInRight','animate__backInUp']
function fetchProduct(data) {

    if(!wrapper) return
    if(data.length) {
        collectionProductCound.innerText=data.length
    data.forEach(function (product) {
        let randomNumber=Math.ceil(Math.random()*4)
        wrapper.innerHTML += `
        <div class="col-md-3 gy-5 col-sm-6 ${animationClasses[randomNumber]} animate__animated wow">
            <div class="product-card" product-id="${product.id}">
                    <div class="product-img">
                        <img src="${paths[level]}${product.img}" alt="">
                    </div>
                    <div class="product-content">
                            <p class="product-title">
                                ${product.name}
                            </p>
                            <p class="product-price">
                            $ ${product.price}
                            </p>
                            <p class="product-description">
                              ${product.desc}
                            </p>
                        </div>
                        
                    <button class="atc-btn" data-atc-btn>
                        Add to Cart
                    </button>
            </div>
            </div>
                `
            })
        }
        else {
            wrapper.innerHTML +=`<h1>Not product found in this collection</h1>`
        }
    }


fetchProduct(Products)