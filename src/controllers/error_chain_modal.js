const error_chain_modal = document.getElementById("error_chain_modal");
const text_error = document.getElementById("text_error")

export function errorModal(textError){
    text_error.textContent = textError
    error_chain_modal.classList.add("active");
    setTimeout(function() {
        error_chain_modal.classList.remove('active');
      }, 2000);
}