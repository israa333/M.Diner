import { menuArray } from "./data.js"
console.log(menuArray)

/* -------- event listener for ids ------- */
document.addEventListener('click' , function(e){
  const orderEL = e.target.closest('[data-id]');
  
  if(orderEL) {
    order(orderEL.dataset.id)
    renderOrder()
  }

})



/*-----event listener for complete order button to show payment details*/
document.addEventListener('click' , function(e){
  const buttonEL = e.target.closest('#completeOrder')
  if(buttonEL){
    paymentDetails()
  }
})

/* --------after pay msg------*/
document.addEventListener('click' , function(e){
  const payBtn = e.target.closest('.PAY')
  if(payBtn){
    paymentSection.style.display = 'none'
    completeOrder.style.display = 'none'

  const fullName = document.getElementById("name").value.trim();
const firstName = fullName.split(" ")[0];
       orderSection.innerHTML = `<p class="msg">THANKS! ${ firstName} , Your Order Is On Its Way! </p>`

  }
})
/* Render menue items */
const renderMenu = () => {
  let feedhtml = '';
   menuArray.forEach(function(item){
    const {name , price ,ingredients,emoji,id}= item

   feedhtml += ` <div class="items" > 
        <span class="details" > 
        <div class="menu-item" >
        <li class="Emoji" >${emoji}</li>
         
        <li class="name"> ${name} </li> 
        <li class="ingredients">${ingredients} </li>
        <li class="price">$${price}</li> 
        <button class="additembtn" data-id="${id}">+</button>
         </div>
        <hr class="my-divider">
    </span>
       </div> `
       
  })
  
return feedhtml
    
}
renderMenu();

document.addEventListener('click' , function(e){
  const removeEl = e.target.closest('.remove')
 if(removeEl){
      const id = Number(removeEl.dataset.remove);
      
orderArray = orderArray.map(item => {
      if(item.id === id) {
        return { ...item, qty: item.qty - 1 }; 
      }
      return item;
    }).filter(item => item.qty > 0); // keep only items with qty > 0

    renderOrder();
 }
  
});

/* --------  listen to add click  ------- */ 

function displayOrder(id){
  /**now we are listeing to clickes on the btn and getting ids */
  if(Number(id) === 0){
    order(id)
    
    console.log("Pizza is added!!")
  }else if(Number(id)===1){
    console.log("Burger is added!!")
  }else{
    console.log("drink is coming!!")
  }
  renderOrder()
}

  let orderArray = []
  
  function order(id){
    id = Number(id); 
    let found = false
    
    orderArray.forEach(item => {
      if(item.id === id){
        item.qty++
        found = true
      } 
    })
    
    if(!found){
      const [menuItem] = menuArray.filter(m => m.id === id);
      if(menuItem) {
        orderArray.push({ id: menuItem.id, qty: 1 , price: menuItem.price })

         }

    }
      // increase order qty if exsist 
    console.log(orderArray)

  }
  
  /* fires when item is selceted from menue  */
  
  /*-----render order section-----*/
   
 function renderOrder(){
    let orderSection = document.getElementById('orderSection')
    let completeOrder = document.getElementById('completeOrder')

       let orderHtml = ''
       if(orderArray.length > 0){
        orderHtml += ` <h3 class="Your-Order">Your Order</h3>`;

      orderArray.forEach(item => {
        const [menuItem] = menuArray.filter(m => m.id === item.id);
  // use menuItem here

   
     orderHtml += ` <span class="details" > <div class="orderBox">
          <div class="name"> ${menuItem.name} <a href="#" class="remove" data-remove="${menuItem.id}">remove</a> </div> 
          <div class="price">$${menuItem.price * item.qty}</div>
          </div> </span>`          
       })
       
       orderHtml += ` <hr class="divider"><div class="orderBox">
                    <p class"total" > Total Price: </p>
                      <p class"total" >  $${totalPrice(orderArray)}</p>
                      </div>`
                    
        orderSection.style.display = 'block'
        completeOrder.style.display = 'block'
  } else {
        orderSection.style.display = 'none'
        completeOrder.style.display = 'none'


    
  } 
         orderSection.innerHTML = orderHtml; 

   }

function totalPrice(orderArray){
    const priceItem = orderArray.reduce(function(total , currentItem){
    return total + (currentItem.price * currentItem.qty);

  },0)
  return priceItem
}
console.log(totalPrice(orderArray))

function paymentDetails(){
  let paymentHTML = ''
  const completeOrderBtn = document.getElementById('completeOrder') 
    const paymentSection = document.getElementById('paymentSection') 

  if(completeOrderBtn){
    paymentHTML += `
    <div class="PAYMENT" > 
    <h2 > Enter Card Details  </h2>  
    <input  type="text" id="name" name="name" placeholder="Enter your name" pattern="[a-zA-Z]+" required>
    <input type="number" id="number" name="number" placeholder="Enter card number" required>
    <input type="password" id="CVV" name="CVV" placeholder="Enter CVV" required>
    <button class="PAY">Pay</button>

</div>
 `
paymentSection.innerHTML = paymentHTML

  paymentSection.style.display = "flex";

    
  }

  return paymentHTML
  
}

function render() {
    document.getElementById('MenuItems').innerHTML = renderMenu();
}
render()
