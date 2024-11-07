
const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}


let selecttag = document.querySelectorAll("select"),
fromText = document.querySelector(".text-write"),
toText = document.querySelector(".text-prient"),
transelatebtn = document.querySelector("button"),
exchangeIcon = document.querySelector(".ex"),
iconCopy = document.querySelector(".copy"),
iconCopy2 = document.querySelector(".copy2"),
iconspeech = document.querySelector(".speech"),
iconspeech2 = document.querySelector(".speech2");





selecttag.forEach((tag,id) => {
    for (const country_code in countries) {
        //selecting english by default an from and hindi as to language
    let selected;
    if(id ==0 && country_code =="en-GB"){
        selected = "selected";
    }
    if(id ==1 && country_code =="tr-TR"){
        selected = "selected";
    }
       let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
       tag.insertAdjacentHTML("beforeend",option);//adding option tag in select tag
      }
      
});



transelatebtn.addEventListener("click",()=>{
    let text = fromText.value,
    transelatfrom = selecttag[0].value,//getting from selecttag value
    transelatto = selecttag[1].value;//getting to selecttag value
    if(text == null || text ==""){
        toText.value = `please write any text..`
    }
    else{
        let apiurl =`https://api.mymemory.translated.net/get?q=${text}&langpair=${transelatfrom}|${transelatto}`
        fetch(apiurl).then(res => res.json()).then(data =>{
         toText.value = data.responseData.translatedText;
        })
    }
   
})

//exchange textarea and select tag value
exchangeIcon.addEventListener("click",() => {
    let tempText = fromText.value,
    templang = selecttag[0].value;

    fromText.value = toText.value;
    toText.value = tempText;
    selecttag[0].value = selecttag[1].value;
    selecttag[1].value= templang;
})

// copy textarea 
iconCopy.addEventListener("click",()=>{
navigator.clipboard.writeText(fromText.value);
})

iconCopy2.addEventListener("click",()=>{
    navigator.clipboard.writeText(toText.value);
})


iconspeech.addEventListener("click",()=>{
    let utterance =new SpeechSynthesisUtterance(fromText.value);
    utterance.lang = selecttag[0].value;
    speechSynthesis.speak(utterance);
    
})
iconspeech2.addEventListener("click",()=>{
    let utter =new SpeechSynthesisUtterance(toText.value);
    utter.lang = selecttag[1].value;
    speechSynthesis.speak(utter);
    
})
