const langCodes = {
    "cpp": "7",
    "c": "6",
    "python": "24",
    "java": "4",
    "ruby": "12",
    "node": "23"
}

function LanguageCode(lang) {
    return (langCodes[lang]);
}

export default LanguageCode;
