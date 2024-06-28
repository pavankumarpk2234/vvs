// alert('Hello')
const inputEl = document.getElementById('search-word');
const meaningBoxEl =document.getElementById('meaning-box');
const wordEl =document.getElementById('word');
const meaningEl =document.getElementById('meaning');
const audioEl =document.getElementById('audio');
const infoEl =document.getElementById('info');

async function getMeaning(word){
    // console.log(word);
    let apiUrl= `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
			infoEl.classList.remove('hide_it');
            meaningBoxEl.classList.add('hide_it');
			infoEl.innerText = `Searching the meaning of ${word}...`;
            let result = await fetch(apiUrl).then((r) => r.json());
            //console.log(result);
            
            infoEl.classList.add('hide_it');
            let meaning = result[0].meanings[0].definitions[0].definition;
            // console.log(meaning);
            meaningBoxEl.classList.remove('hide_it');
            wordEl.innerText = word;
            meaningEl.innerText = meaning;
            
            let sounds = result[0].phonetics;
            let i = sounds.findIndex((el) => {
                return el.audio != '';
            })
            // console.log(sounds);
            // console.log(i);

            let audioSrc = result[0].phonetics[i].audio;
            // console.log(audioSrc);

            audioEl.setAttribute('src',audioSrc);
        } catch (error) {
            meaningBoxEl.classList.add('hide_it');
            infoEl.classList.remove('hide_it');
            infoEl.innerText = `Sorry, we could not find the meaning of ${word}`;
        }
}

inputEl.addEventListener('keyup',(e) => {
    let word = inputEl.value;
    if(word != '' && e.key === 'Enter'){
        // console.log(word);
        getMeaning(word);
    }
})
