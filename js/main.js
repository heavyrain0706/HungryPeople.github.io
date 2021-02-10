document.addEventListener("DOMContentLoaded", init)

function init(){

  //Фиксированная навигация
  window.onscroll = function(){
      navScroll();
  };

  let navigation = document.querySelector('.nav');
  const navItems = document.querySelectorAll('.nav__item');

  function navScroll(){
    if (window.pageYOffset >= headerHeight) {
      navigation.classList.add("fixed");
      navItems.forEach(item => {
        item.classList.add('afterScroll');
      })
    } else {
      navigation.classList.remove("fixed");
      navItems.forEach(item => {
        item.classList.remove('afterScroll');
      })
    }
  }

  //Табы
  let btns = document.querySelectorAll('.tabs__btn'),
      content = document.querySelectorAll('.tabs__content');
      
    function change(arr, i) {
      arr.forEach(item => {
        item.forEach(i => {i.classList.remove('is-active')});
        item[i].classList.add('is-active');
      })
    }

    for(let i = 0; i < btns.length; i++){
      btns[i].addEventListener('click', () => {
        change([btns, content], i);
      })
    }

  //Слайдеры
  $("#slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    adaptiveHeight: true
  });


  //Select на форме
  let selectHeader = document.querySelectorAll('.select__header'),
      selectItem = document.querySelectorAll('.select__item'),
      selectBody = document.querySelectorAll('.select__body');

      const select = (arr, i) => {
        arr[i].classList.toggle('select-active');
        arr[i].previousElementSibling.querySelector('.select__icon').children[0].classList.add('arrow-active');

        switch (i) {
          case 0:
            arr[1].classList.remove('select-active');
            arr[2].classList.remove('select-active');
            arr[2].classList.remove('select-active');
            break;
          case 1:
            arr[0].classList.remove('select-active');
            arr[2].classList.remove('select-active');
            arr[3].classList.remove('select-active');
            break;
          case 2:
            arr[0].classList.remove('select-active');
            arr[1].classList.remove('select-active');
            arr[3].classList.remove('select-active');
            break;
          case 3:
            arr[0].classList.remove('select-active');
            arr[1].classList.remove('select-active');
            arr[2].classList.remove('select-active');
            break;
        }

        selectItem.forEach(item => {
          item.addEventListener('click', () => {
            let optionValue = item.innerText,
                currentValue = item.closest('.select').querySelector('.select__current');
            currentValue.innerText = optionValue;
            item.parentElement.classList.remove('select-active');
            item.parentElement.previousElementSibling.querySelector('.select__current').style.color = '#757587';
            item.closest('.select').querySelector('.select__icon').children[0].classList.add('arrow-colored');
          })
      })
    }

      for(let i = 0; i < selectHeader.length; i++){
        selectHeader[i].addEventListener('click', () => {
          select(selectBody, i);
        })
      }


  //Модальное окно
  let modal = document.querySelector('.modal'),
      callModalBtn = document.getElementById('call-modal'),
        modalCloseBtn = document.querySelector('.modal__close');

        const hideModal = () => {
          modal.classList.toggle('modal__hide');
          modal.classList.toggle('modal__show');
          modal.children[0].classList.remove('hide');
        }

        callModalBtn.addEventListener('click', () => {
          modal.classList.remove('modal__hide');
          modal.classList.toggle('modal__show');
          document.body.classList.toggle('lock');
        })

        modalCloseBtn.addEventListener('click', () => {
          modal.children[0].classList.add('hide');
          document.body.classList.toggle('lock');
          setTimeout(hideModal, 500);
        })

        window.addEventListener('click', (e) => {
          if(e.target == modal){
            modal.children[0].classList.add('hide');
            document.body.classList.remove('lock');
            setTimeout(hideModal, 500);
          }
        })

  //Плавный скрол
    const navLinks = document.querySelectorAll('.nav__link');
    let exploreBtn = document.getElementById('explore'),
        arrowBtn = document.querySelector('.header__arrow-btn');
    const topOffset = document.querySelector('.nav').offsetHeight;
        
      navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();       
          
          let href = link.getAttribute('href').substring(1);
          let scrollTarget = document.getElementById(href);
          let elementPosition = scrollTarget.getBoundingClientRect().top;
          let offsetPosition = elementPosition - topOffset;

          let scrollOptions = {
            top: offsetPosition,
            behavior: 'smooth'
          };

          window.scrollBy(scrollOptions);
        })
      })

      exploreBtn.addEventListener('click', () => {
        let scrollTarget = document.getElementById('gallery');
        let elementPosition = scrollTarget.getBoundingClientRect().top;
        let offsetPosition = elementPosition - topOffset;

        let scrollOptions = {
            top: offsetPosition,
            behavior: 'smooth'
          };

        window.scrollBy(scrollOptions);
      })

      arrowBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let scrollTarget = document.querySelector('.contant');
        let elementPosition = scrollTarget.getBoundingClientRect().top;
        let offsetPosition = elementPosition;

        let scrollOptions = {
          top: offsetPosition,
          behavior: 'smooth'
        }

        window.scrollBy(scrollOptions);
      })

    //Активный пункт меню
    const sections = Array.from(document.getElementsByTagName('section'));
    let header = document.querySelector('.header'),
        headerHeight = header.offsetHeight,
          nav = document.querySelector('.nav'),
            navHeight = nav.offsetHeight;
      sections.splice(0,1);
      sections.splice(3,1);
        
    window.addEventListener('scroll', function(){
      let currentPos = document.documentElement.scrollTop;

      sections.forEach(section => {
        let sectionTopPos = section.offsetTop - navHeight,
            sectionBottomPos = sectionTopPos + section.offsetHeight;

          if(currentPos >= sectionTopPos && currentPos <= sectionBottomPos){
              nav.querySelectorAll('a').forEach(element =>{
                element.classList.remove('is-active');
              });
              let href = `#${section.getAttribute('id')}`;
              nav.querySelector(`a[href="${href}"]`).classList.add('is-active'); 
          }
      })

      if(currentPos < headerHeight - navHeight){
        nav.querySelectorAll('a').forEach(element =>{
          element.classList.remove('is-active');
        });
      }

    })

  //Кнопка наверх
  let goUpBtn = document.querySelector('.anchor');

  window.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop > 1500){
      goUpBtn.classList.add('is-active');
    } else {
      goUpBtn.classList.remove('is-active');
    }
  })
  
  goUpBtn.addEventListener('click', (event) =>{
    event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
  })
    
  //Бургер
  let burger = document.querySelector('.nav__burger'),
      navList = document.querySelector('.nav__list');

  burger.addEventListener('click', event => {
      document.body.classList.toggle('lock');
      burger.classList.toggle('active');
      if(window.pageYOffset < headerHeight){
        navList.classList.toggle('active-padding');
      } else {
        navList.classList.toggle('active');
      }
  })

  navLinks.forEach(link => {
      link.addEventListener('click', event => {
        document.body.classList.remove('lock');
        burger.classList.remove('active');
        navList.classList.remove('active');
        navList.classList.remove('active-padding');
      })
  })

  //MaskedInput
  $("#phone-booking").mask("+380(99)999-99-99");
  $("#phone-contact").mask("+380(99)999-99-99");
  $("#phone-modal").mask("+380(99)999-99-99");

  //Обработка форм
  const bookingForm = document.querySelectorAll('.form-booking');
  let contactForm = document.querySelector('.form-contact');
  const name = document.getElementsByName('name'),
        email = document.getElementsByName('email');
  const namePattern = /^[A-zА-яЁё]+$/,
        emailPattern = /^\S+@\S+\.\S+/;
  const nameEmail = [];
  const selCurrent = document.querySelectorAll('.select__current');
  let okayInput = true;

  nameEmail.push(name, email);

  const checkEmpty = (element) => {
    if(element.name.value.length == 0){
      element.name.style.border = "2px solid red";
      okayInput = false; 
    }
    if(element.email.value.length == 0){
      element.email.style.border = "2px solid red"
      okayInput = false;
    }
  }

  const checkCurrentText = (item) => {
    if(item.innerText == 'Количество гостей' || item.innerText == 'Время'){
      item.style.color = "#EA0D0D";
      okayInput = false
    }else{
      okayInput = true;
    }
  }

  nameEmail.forEach(subarray => {
    subarray.forEach(input => {
      input.addEventListener('input', event => {
        switch(input.name)
        {
          case 'name' :
              if(!namePattern.test(input.value)){
                  okayInput = false;
                  input.style.border = "2px solid red";
              } else{
                okayInput = true;
                input.style.border = "none";
              }
          break;
          case 'email' :
              if(!emailPattern.test(input.value)){
                okayInput = false;
                input.style.border = "2px solid red";
              } else{
                okayInput = true;
                input.style.border = "none";
              }
          break;
        }
      })
    })
  })

  bookingForm.forEach(form => {
    form.addEventListener('submit', event => {

      checkEmpty(form);
    
      switch(form.id)
        {
          case 'booking-form' :
            selCurrent.forEach(item => {
              switch(item.id)
              {
                case 'current-booking' :
                  console.log(item.innerText);
                  checkCurrentText(item);
                break;
                case 'current-modal' :
                break;
              }
          })
          break;
          case 'modal-form' :
            selCurrent.forEach(item => {
              switch(item.id)
              {
                case 'current-booking' :
                break;
                case 'current-modal' :
                  console.log(item.innerText);
                  checkCurrentText(item);
                break;
              }
          })
          break;
        }  

      if(!okayInput){
        event.preventDefault();
      }
    })
  })

  contactForm.addEventListener('submit', event => {
    
    checkEmpty(contactForm);

    if(!okayInput){
      event.preventDefault();
    }

  })

  //Animate on scroll
  AOS.init();
}
