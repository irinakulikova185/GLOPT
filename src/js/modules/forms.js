
const forms = () => {
 
    const form = document.querySelectorAll('form'),
    modalRecall = document.querySelector('#recall'),
    modalThanks = document.querySelector('#thanks'),
    modalOverlay = document.querySelector('.overlay'),
    inputs = document.querySelectorAll('input');

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };

form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

    const loadMessage = document.createElement('img');
    loadMessage.src = 'icons/spinner.svg';
    loadMessage.style.display = 'block'; 
    if(item.classList.contains('questions__form')) {
      loadMessage.style.margin = '-32px auto';
    } else if (item.classList.contains('consultation__form')) {
      loadMessage.style.margin = '-54px auto';
    } else {
      loadMessage.style.margin = '0 auto';
    }
  
  item.insertAdjacentElement('afterend', loadMessage);

  const formData = new FormData(item);

  const showStatusMessage = () => {
      modalRecall.style.display = 'none';
      modalOverlay.style.display = 'block';
      modalThanks.style.display = 'block';
  };

  postData('server.php', formData)
    .then(res => {
      console.log(res);
      loadMessage.remove();
      showStatusMessage();
      // setTimeout( () => {
      //   modalOverlay.style.display = 'none';
      //       modalThanks.style.display = "none";
      //       document.body.style.overflow = "";
      //       document.body.style.marginRight = `0px`;
      // }, 5000);
    })
    .catch( () => {
      loadMessage.remove();
      showStatusMessage();
      console.log( document.querySelector('.modal_mini'))
      document.querySelector('.modal_mini').textContent = '';
      document.querySelector('.modal_mini').textContent = 'Произошла ошибка..Повторите попытку позднее';
    })
    .finally(() => {
        clearInputs();
      });
     });
  
      
});

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

};

export default forms;