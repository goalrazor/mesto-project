export function polymorph() {
  let lenTwoFunc = [];
  for (let i = 0; i < arguments.length; i++)
    if (typeof (arguments[i]) == "function")
      lenTwoFunc[arguments[i].length] = arguments[i];
  return function () {
    return lenTwoFunc[arguments.length].apply(this, arguments);
  }
}

export function renderSubmitBtnLoading(element, isLoading, normalSubmitText) {
  const loadingText = 'Сохранение...';
  if (isLoading) {
    element.value = loadingText;
  } else {
    element.value = normalSubmitText;
  }
}
