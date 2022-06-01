
export function convertToInt(queryString) {
    return parseFloat(document.querySelector(queryString)?.innerText.replace(',',''))
}

export function convertToString(value) {
    return Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}