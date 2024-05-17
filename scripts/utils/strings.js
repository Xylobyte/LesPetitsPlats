const removeAccents = input => input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const removeSpecialChars = input => input.replace(/[^\w\s]/gi, "");

export const cleanString = (input) => {
    const withoutAccents = removeAccents(input);
    return removeSpecialChars(withoutAccents);
}