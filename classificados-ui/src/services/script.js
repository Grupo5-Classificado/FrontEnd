let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onClick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
    userForm.classList.remove('active');
    console.log('teste');
  };

  let cartItem = document.querySelector('.cart-items-container');

  document.querySelector('#cart-btn').onClick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    userForm.classList.remove('active');
    console.log('teste');
  };

  let searchForm = document.querySelector('.search-form');

  document.querySelector('#search-btn').onClick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    userForm.classList.remove('active');
    console.log('teste');
  };

  let userForm = document.querySelector('.user-form');

  document.querySelector('#user-btn').onClick = () =>{
    userForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    console.log('teste');
  }

  window.onscroll = () =>{
      navbar.classList.remove('active');
      searchForm.classList.remove('active');
      cartItem.classList.remove('active');
  }