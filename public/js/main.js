const setColor = (colorName, newColor) => document.documentElement.style.setProperty(colorName, newColor)
const isDarkMode = () => JSON.parse(localStorage.getItem('darkMode')) || false

const setColorSchema = withDarkMode => {
    if (withDarkMode) {
        setColor('--primary-color', '#0c111f')
        setColor('--secondary-color', '#1d2e51')
        setColor('--third-color', '#eee')
    } else {
        setColor('--primary-color', '#ffeb34')
        setColor('--secondary-color', '#fff')
        setColor('--third-color', '#000')
    }
}

const toggleDarkMode = () => {
    setColorSchema(!isDarkMode())
    localStorage.setItem('darkMode', !isDarkMode())
}

setColorSchema(isDarkMode())
