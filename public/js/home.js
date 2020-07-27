const rules = document.querySelector('.rules')
const toggleRules = () => rules.classList.toggle('rules--open')

const closeLightbox = () => {
    document.querySelector('.messageLightbox').setAttribute('style', 'display: none;')
}
