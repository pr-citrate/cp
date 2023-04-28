function preventRightClick(event) {
  event.stopPropagation();
  event.preventDefault();
}

export default preventRightClick;
