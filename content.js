if (window.location.href.startsWith('https://rbixm.qualtrics.com/')) {
    console.log('start 1.0.0');

    let bkCode = '18440';
    /* let datum = '2024-09-05'; */
    let datum = '05/09/2024';
    let ora = '12';
    let perc = '22';
    let napszak = '1';

    let intervall;
    const buttonStop = document.createElement('BUTTON');
    buttonStop.innerText = 'Start';
    buttonStop.style.position = 'fixed';
    buttonStop.style.bottom = '0';
    buttonStop.style.left = '0';
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

    let vanButton = false;
    let resolveActive = false;
    let page = 0;

    function iterate() {
        console.log('Iterate');

        if (page == 0) {
            let input = document.querySelector('#QR\\~QID4');
            if (input) {
                input.value = bkCode;
                clickNext();
                page++;
            }
        }

        const latogatasSpan = document.querySelector('#choice1QID8 > span > label > span');
        if (latogatasSpan) {
            page = 1;
        } else if (page === 1) {
            page++;
        }

        if (page === 1) {
            const dateInput = document.querySelector('#QR\\~QID118\\~2');
            const oraSelect = document.querySelector('#QR\\~QID8\\#1\\~1');
            const percSelect = document.querySelector('#QR\\~QID8\\#2\\~1');
            const napszakSelect = document.querySelector('#QR\\~QID8\\#3\\~1');

            if (dateInput && oraSelect && percSelect && napszakSelect) {
                dateInput.value = datum;
                oraSelect.value = ora;
                percSelect.value = perc;
                napszakSelect.value = napszak;
            }

            const nextBtn = document.querySelector('#NextButton');
            nextBtn?.addEventListener('click', () => {
                vanButton = false;
            });

            if (!vanButton) {
                let asd = document.createElement('BUTTON');
                asd.innerText = 'BKResolve!';
                asd.id = 'PreviousButton';
                asd.addEventListener('click', () => {
                    nextBtn?.click();
                    resolveActive = true;
                });

                nextBtn?.parentNode?.insertBefore(asd, nextBtn);

                vanButton = true;

                asd.click();
            }
        } else if (page > 1 && resolveActive) {
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
    }

    function clickNext() {
        const nextBtn = document.querySelector('#NextButton');
        nextBtn.click();
    }
}
