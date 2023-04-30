/*
* Общий фидбек по файлу -- нужно отчистить его от не используемых комментариев и не нужных кусков кода
*/

const form = document.getElementById('form');
const button = document.getElementById('send_mess');
// const inputs = document.querySelectorAll('.input');
const liveInputs = document.getElementsByClassName('input');
const inputEmail = document.querySelector('.input__mail');
const optionItemOther = document.querySelector('.form__theme-other');
const formTheme = document.querySelector('.form__theme');



// function generationLiveInputs(){
//   if (formTheme.parentElement.nextElementSibling.classList.contains('input__theme')) {
//     liveInputs = document.getElementsByClassName('input');
//     inputs = Array.from(liveInputs);
//   }
//   return inputs;
// }

// Эта функция может (validation) быть упрощена и реализована в более читаемом виде, для этого нужно сделать следующее:
// Убрать переменнут result, и реструктурировать ее вот так:
// function validation(input) {
//   if (input.value == '') {
//     ... здесь какие-то манипуляции с классами
//     return false;
//   }
//   .. здесь какие-то манипуляции с классами если предыдущее условие не выполненно
//   return true;
// }
// Дополнительно, у тебя присутствует явный элемент переключения классов, и случайному человеку не совсем просто будет понять
// Как он может переключить инпут в состояние ошибки, я бы вынес это в отдельную функцию, и внутрии нее уже делал бы инпут 
// красным или отчищал все в зависимости от аргументов.
function validation(input) {
  let result = true;
  if (input.value == '') {
    input.classList.add('form__error');
    input.classList.remove('input');
    result = false;
  } else {
    input.classList.remove('form__error');
    input.classList.add('input');
    result = true;
  }
  return result;
}

// form.addEventListener('input', function () {
//   inputs.forEach((input) => validation(input));
//   console.log('fsdfsd');
// });


// Создание новых инпутов (да и вообще любых элементов в HTML) хороший кандидат на вынос в отдельную функцию, чтобы читающему
// Тело listner'a было легче понять что внутри происходит, и чтобы в будущем можно было переиспользовать эту функцию.
formTheme.addEventListener('change', function (event){
  const wrapInputTheme = document.createElement('li')
  wrapInputTheme.classList.add('form__item', 'input__theme');

  const labelTextOther = document.createElement('label')
  labelTextOther.classList.add('form__text');
  labelTextOther.textContent = 'Какая тема?';

  const inputTheme = document.createElement('input');
  inputTheme.classList.add('input__theme', 'input');
  inputTheme.placeholder = 'Расскажите подробнее';
  inputTheme.type = "text";

  let indexOption = formTheme.selectedIndex;
  let options = formTheme.options;

  let parentElem = formTheme.parentElement;
  let nextWrapTheme = parentElem.nextSibling;

if(!formTheme.parentElement.nextElementSibling.classList.contains('input__theme') && indexOption === options.length-1){
    parentElem.insertAdjacentElement('afterEnd', wrapInputTheme);
    wrapInputTheme.append(labelTextOther);
    wrapInputTheme.append(inputTheme);
  }
  if ((indexOption !== 2) && formTheme.parentElement.nextElementSibling.classList.contains('input__theme')) {
    nextElem = parentElem.nextElementSibling;
    nextElem.remove();
  }

});
// старый прослушиватель
// inputs.forEach((input) =>
//   input.addEventListener('input', function () {
//     validation(input);
//     console.log(generationLiveInputs());
//   })
// );

form.addEventListener('input', function(){
  for (let input of liveInputs) {
    // может быть упрощено вот так:
    // input.addEventListener('input', () => validation(input));
    // Станет в одну строку и будет приятнее.
    input.addEventListener('input', function () {
          validation(input);
        })
  }
})


// здесь тоже можно сделать немного оптимальней:
// 1. Перебирать можно так же как ты делаешь это в addEventListener('input', ...), так как тебе не нужен индекс элемента, текущая реализация избыточна
// 2. переменная result тоже может быть убрана, ты можешь просто проверять результат выполнения функции на текущей итерации
// 
// И, бонус!
// Если форма заполнена верно, сейчас ничего не происходит.
form.addEventListener('submit', function (event) {
  event.preventDefault();
  let result;
  const inputs = document.querySelectorAll('.input');
  inputs.forEach((input) => validation(input));
  for (i = 0; i < inputs.length; ++i){
    result = validation(inputs[i]);
    if (result === false) {
      alert ('Заполните все поля!');
      break
    }
  }
});
