let cart=JSON.parse(localStorage.getItem('cart')) || []



// Mini Cart JS goes here 
const miniCartToggle = document.querySelector('[data-cart-count]')
let miniCart = document.querySelector('aside')
let closeBtn = document.querySelector('.close-btn')
let miniCartWrapper = document.querySelector('.mn-wrapper')
let overlay = document.querySelector('.overlay')

const atc=document.querySelectorAll('.atc-btn')

function miniCartToggleFn(toggle) {
    if (toggle) {
        miniCart.classList.add('open')
        document.body.classList.add('no-scroll')
        overlay.classList.add('open')
    }
    else {
        miniCart.classList.remove('open')
        document.body.classList.remove('no-scroll')
        overlay.classList.remove('open')
    }

}

miniCartToggle.addEventListener('click', function () {
    miniCartToggleFn(1)
})
closeBtn.addEventListener('click', function () {
    miniCartToggleFn()
})

function bindingCart() {
    miniCartWrapper.innerHTML = ''
    if (!cart.length) {
        miniCartWrapper.innerHTML += `
            <div class="no-product">
                <h3>Your cart is empty</h3>
                <button class="continue-shopping">Continue Shopping</button>
            </div>
            `

    }

    else {

        cart.forEach(function (cartItem) {

            miniCartWrapper.innerHTML += `
                <div class="product" item-id="${cartItem.id}">
                    <div class="p-img">
                        <img src="${paths[level]}${cartItem.img}" alt="">
                    </div>
                    <div class="content">
                        <p class="title">
                        ${cartItem.name}
                        </p>
                        <p class="price m-0">
                            $${cartItem.price}
                        </p>

                        <div class="quantity-selector d-flex">
                        <button class="qty qty-minus btn">-</button>
                        <input type="text" class="form-control mx-3" readonly value="${cartItem.quantity}">
                        <button class="qty qty-plus btn">+</button>
                        
                        </div>
                    </div>
                    <div class="remove-wrapper">
                        <button class="remove" data-remove>
                            Rremove from cart
                        </button>
                    </div>
                </div>
                `
                let cartCount=cart.reduce((prev,curr)=>{
                    return prev+curr.quantity
                },0)
                
                let subtotal=cart.reduce((prev,curr)=>{
                    return prev+curr.price * curr.quantity
                },0)

                document.querySelector('[data-cart-count]').setAttribute('data-cart-count',cartCount)
                document.querySelector('[data-subtotal]').innerText=`$ ${subtotal}`
        })
        
        
        const removeBtn=document.querySelectorAll('[data-remove]')
        
        for(let i=0; i<removeBtn.length; i++) {
            removeBtn[i].addEventListener('click',function() {
                let itemId = this.closest('.product').getAttribute('item-id')
                cart=cart.filter((product)=>product.id != itemId)
                console.log(cart,"show cart")
                miniCartToggle.setAttribute('data-count',cart.length)
                bindingCart()
            })
        }
        miniCartToggle.setAttribute('data-count',cart.length)
        
    }
}

// Mini Cart Ends here




// ATC logic goes here

atc.forEach(atc=>{
    atc.addEventListener('click',function(e) {
        let id=e.target.closest('.product-card').getAttribute('product-id')

        let cartItem=cart.find(product=>product.id===id)

        if(cartItem) {
            cartItem.quantity=cartItem.quantity+1
        }
        else {
            let item=All_PRODUCTS.find(product=>product.id === id)
            item.quantity=1
            cart.push(item)
            
        }

        localStorage.setItem('cart',JSON.stringify(cart))
        
        bindingCart()

        
        console.log(cart)
    })
})




bindingCart()




miniCartWrapper.addEventListener('click',e=>{
        let id=e.target.closest('.product').getAttribute('item-id')
        let foundItem=cart.find(item=>item.id===id)
        
        if(e.target.classList.contains('qty-plus')) {
            cart=cart.map(item=>{
                
                if(item.id===id) {
                    foundItem.quantity=foundItem.quantity+1
                    return foundItem
                }
                return item
            })
        }
        if(e.target.classList.contains('qty-minus')) {
            if(foundItem.quantity > 1) {
                cart=cart.map(item=>{
                    if(item.id===id) {
                        foundItem.quantity=foundItem.quantity-1
                        return foundItem
                    }
                    return item
                })
            }
            else {
                cart = cart.filter(cartItem=>cartItem.id!==id)
            }
        }
        
        if(e.target.classList.contains('remove')) {
            cart = cart.filter(cartItem=>cartItem.id!==id)
        }
        localStorage.setItem('cart',JSON.stringify(cart))
        bindingCart()
        
        
    })
    