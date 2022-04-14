export function renderSubmitBtnLoading(element, isLoading, normalSubmitText) {
  const loadingText = 'Сохранение...';
  if (isLoading) {
    element.value = loadingText;
  } else {
    element.value = normalSubmitText;
  }
}
