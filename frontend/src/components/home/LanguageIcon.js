import React from 'react';

const iconClasses = {
    "cpp": "devicon-cplusplus-line",
    "c": "devicon-c-line",
    "python": "devicon-python-plain",
    "java": "devicon-java-plain",
    "ruby": "devicon-ruby-plain",
    "node": "devicon-nodejs-plain"
}

function LanguageIcon({lang}) {
    return (<i
        className={iconClasses[lang]}
        style={{fontSize: '2em'}}
    ></i>)
}

export default LanguageIcon;
