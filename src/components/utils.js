export function polymorph() {
  let len2func = [];
  for (let i = 0; i < arguments.length; i++)
    if (typeof (arguments[i]) == "function")
      len2func[arguments[i].length] = arguments[i];
  return function () {
    return len2func[arguments.length].apply(this, arguments);
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
