if (window.location.href.startsWith('https://rbixm.qualtrics.com/')) {
    console.log('start 1.0.0');

    let bkCode = '18440';
    let datum = '05/09/2024';
    let ora = '12';
    let perc = '22';
    let napszak = '1';

    bkCode = null;
    datum = null;
    ora = null;
    perc = null;
    napszak = null;

    let intervall;
    const buttonStop = document.createElement('BUTTON');
    buttonStop.innerText = 'Start2';
    buttonStop.id = 'play-button';

    buttonStop.addEventListener('click', () => {
        if (intervall) {
            clearInterval(intervall);
            intervall = null;
            buttonStop.innerText = 'Start';
        } else {
            intervall = setInterval(iterate, 2000);
            buttonStop.innerText = 'Stop';
        }
    });
    document.body.appendChild(buttonStop);

    function iterate() {
        console.log('Iterate');

        const labelSingle = document.getElementsByClassName('SingleAnswer')?.[0];
        const labelMulti = document.getElementsByClassName('MultipleAnswer')?.[0];
        const tds = document.getElementsByClassName('c4');
        const textarea = document.getElementsByClassName('InputText')?.[0];

        if (labelSingle || labelMulti || tds?.length || textarea) {
            if (labelSingle && labelSingle?.id?.startsWith('QID')) {
                labelSingle.click();
            } else if (labelMulti && labelMulti.id.startsWith('QID')) {
                labelMulti.click();
            } else if (tds.length) {
                for (let i = 0; i < tds.length; i++) {
                    const input = tds[i].querySelectorAll('input[type="radio"]')?.[0];

                    if (input) {
                        input.click();
                    }
                }
            } else if (textarea) {
                textarea.value = 'Hacked by soza';
            }
            clickNext();
        }
    }

    function clickNext() {
        const nextBtn = document.querySelector('#NextButton');
        nextBtn.click();
    }
}
