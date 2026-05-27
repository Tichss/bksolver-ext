(() => {
    const QUALTRICS_URL = 'https://rbixm.qualtrics.com/';
    const MEDALLIA_URL = 'https://survey3.medallia.eu';
    const ITERATE_INTERVAL_MS = 2000;
    const TEXTAREA_VALASZ = 'Minden finom, minden jó';

    // Régi session: alap + paraméterek külön, hogy bővíthető legyen.
    const QUALTRICS_SESSION_BASE = 'https://rbixm.qualtrics.com/jfe/form/SV_9MHgHFvPm0OEHr0';
    const QUALTRICS_SESSION_PARAMS = '?CountryCode=HUN&Q_Language=HU&PT=1';
    const QUALTRICS_SESSION_URL = QUALTRICS_SESSION_BASE + QUALTRICS_SESSION_PARAMS;

    const href = window.location.href;

    if (href.startsWith(QUALTRICS_URL)) {
        initSolver();
    } else if (href.startsWith(MEDALLIA_URL)) {
        initSessionLink();
    }

    // Qualtrics oldal: automata kitöltő Start/Stop gomb.
    function initSolver() {
        /** @type {ReturnType<typeof setInterval> | null} */
        let intervall = null;

        const buttonStop = document.createElement('BUTTON');
        buttonStop.innerText = 'Start';
        buttonStop.id = 'play-button';

        buttonStop.addEventListener('click', () => {
            if (intervall) {
                clearInterval(intervall);
                intervall = null;
                buttonStop.innerText = 'Start';
            } else {
                intervall = setInterval(iterate, ITERATE_INTERVAL_MS);
                buttonStop.innerText = 'Stop';
            }
        });

        document.body.appendChild(buttonStop);
    }

    // Medallia oldal: link a régi qualtrics session-re.
    function initSessionLink() {
        const link = document.createElement('A');
        link.innerText = 'Régi session';
        link.id = 'play-button';
        link.setAttribute('href', QUALTRICS_SESSION_URL);
        /* link.setAttribute('target', '_top'); */

        document.body.appendChild(link);
    }

    function iterate() {
        if (fillAnswer()) {
            clickNext();
        }
    }

    // Megpróbálja kitölteni az aktuális kérdést. true, ha talált és kitöltött valamit.
    function fillAnswer() {
        const labelSingle = /** @type {HTMLElement} */ (
            document.getElementsByClassName('SingleAnswer')?.[0]
        );
        const labelMulti = /** @type {HTMLElement} */ (
            document.getElementsByClassName('MultipleAnswer')?.[0]
        );
        const tds = document.getElementsByClassName('c4');
        const textarea = /** @type {HTMLInputElement} */ (
            document.getElementsByClassName('InputText')?.[0]
        );

        if (labelSingle?.id?.startsWith('QID')) {
            labelSingle.click();
            return true;
        }

        if (labelMulti?.id?.startsWith('QID')) {
            labelMulti.click();
            return true;
        }

        if (tds.length) {
            for (let i = 0; i < tds.length; i++) {
                const input = /** @type {HTMLElement} */ (
                    tds[i].querySelectorAll('input[type="radio"]')?.[0]
                );
                input?.click();
            }
            return true;
        }

        if (textarea) {
            textarea.value = TEXTAREA_VALASZ;
            return true;
        }

        return false;
    }

    function clickNext() {
        const nextBtn = /** @type {HTMLElement} */ (document.querySelector('#NextButton'));
        nextBtn?.click();
    }
})();
