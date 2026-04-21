document.addEventListener('DOMContentLoaded', function() {

    let orderItems = [];
    let runningTotal = 0;
  
    document.querySelectorAll('.drinkCheck').forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        const sizeSelect = document.getElementById('size');
        const sizeExtra = sizeSelect.value ? parseFloat(sizeSelect.selectedOptions[0].dataset.extra) : 0;
        let liveTotal = 0;
        document.querySelectorAll('.drinkCheck:checked').forEach(function(checked) {
          liveTotal += parseFloat(checked.dataset.price) + sizeExtra;
        });
        document.getElementById('liveTotal').textContent = '$' + liveTotal.toFixed(2);
      });
    });
  
    document.getElementById('size').addEventListener('change', function() {
      const sizeExtra = parseFloat(this.selectedOptions[0].dataset.extra) || 0;
      let liveTotal = 0;
      document.querySelectorAll('.drinkCheck:checked').forEach(function(checked) {
        liveTotal += parseFloat(checked.dataset.price) + sizeExtra;
      });
      document.getElementById('liveTotal').textContent = '$' + liveTotal.toFixed(2);
    });
  
    document.getElementById('addItem').addEventListener('click', function() {
      const sizeSelect = document.getElementById('size');
      const checkedDrinks = document.querySelectorAll('.drinkCheck:checked');
  
      if (checkedDrinks.length === 0 || !sizeSelect.value) {
        alert('Please select at least one drink and a size!');
        return;
      }
  
      const size = sizeSelect.value;
      const extra = parseFloat(sizeSelect.selectedOptions[0].dataset.extra);
  
      checkedDrinks.forEach(function(checkbox) {
        const drink = checkbox.value;
        const basePrice = parseFloat(checkbox.dataset.price);
        const itemPrice = basePrice + extra;
  
        orderItems.push({ drink, size, price: itemPrice });
        runningTotal += itemPrice;
  
        const itemList = document.getElementById('itemList');
        const li = document.createElement('li');
        li.textContent = size + ' ' + drink + ' — $' + itemPrice.toFixed(2);
        itemList.appendChild(li);
  
        checkbox.checked = false;
      });
  
      document.getElementById('runningTotal').textContent = '$' + runningTotal.toFixed(2);
      document.getElementById('orderList').style.display = 'block';
      document.getElementById('liveTotal').textContent = '$0.00';
      sizeSelect.value = '';
    });
  
    document.getElementById('placeOrder').addEventListener('click', function() {
      const name = document.getElementById('name').value;
  
      if (!name) {
        alert('Please enter your name!');
        return;
      }
  
      if (orderItems.length === 0) {
        alert('Please add at least one item!');
        return;
      }
  
      const now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      const pickupTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      document.getElementById('customerName').textContent = name;
      document.getElementById('pickupTime').textContent = pickupTime;
      document.getElementById('orderPrice').textContent = '$' + runningTotal.toFixed(2);
  
      const receiptItems = document.getElementById('receiptItems');
      receiptItems.innerHTML = '';
      orderItems.forEach(function(item) {
        const p = document.createElement('p');
        p.textContent = item.size + ' ' + item.drink + ' — $' + item.price.toFixed(2);
        receiptItems.appendChild(p);
      });
  
      document.getElementById('receipt').style.display = 'block';
      document.getElementById('order').style.display = 'none';
      document.getElementById('receipt').scrollIntoView({ behavior: 'smooth' });
    });
  
  });