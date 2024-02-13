export const validateNIF = (nif) => {
    nif = nif.trim().toUpperCase();
    const nifPattern = /^[XYZ]?\d{7,8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

    if (!nifPattern.test(nif)) {
        return false; // Formato inválido
    }

    // Si es un NIE, cambia la letra inicial por un 0
    if (nif.charAt(0) === 'X' || nif.charAt(0) === 'Y' || nif.charAt(0) === 'Z') {
        nif = '0' + nif.substr(1);
    }

    const documentType = nif.charAt(0);
    const documentNumber = parseInt(nif.substr(0, nif.length - 1), 10);

    const controlLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let expectedLetter;

    if (documentType === 'X') {
        expectedLetter = controlLetters.charAt(documentNumber % 23);
    } else if (documentType === 'Y') {
        expectedLetter = controlLetters.charAt((documentNumber + 10000000) % 23);
    } else if (documentType === 'Z') {
        expectedLetter = controlLetters.charAt((documentNumber + 20000000) % 23);
    } else {
        expectedLetter = controlLetters.charAt(documentNumber % 23);
    }

    if (nif.charAt(nif.length - 1) !== expectedLetter) {
        return false; // Letra de control incorrecta
    }

    return true; // NIF/NIE válido
};
