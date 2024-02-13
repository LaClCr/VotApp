// Función para validar el NIF/NIE, en principio sirve para ambos tipos de documento.
export const validateNIF = (nif) => {

    nif = nif.trim().toUpperCase();
    // Patrón para NIFs españoles (8 dígitos y una letra) y NIEs (letra X, Y o Z seguida de 7 dígitos y una letra)
    const nifPattern = /^([XYZ]|\d{1})\d{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/;

    if (!nifPattern.test(nif)) {
        return false; // Formato inválido
    }

    // Extraer el tipo de documento (NIF o NIE) y el número (sin la letra de control)
    const documentType = nif.charAt(0);
    const documentNumber = parseInt(nif.substr(0, nif.length - 1), 10);

    // Array con las letras de control según el documento
    const controlLetters = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let expectedLetter;

    // Calcular la letra de control esperada
    if (documentType === 'X') {
        expectedLetter = controlLetters.charAt(documentNumber % 23);
    } else if (documentType === 'Y') {
        expectedLetter = controlLetters.charAt((documentNumber + 10000000) % 23);
    } else if (documentType === 'Z') {
        expectedLetter = controlLetters.charAt((documentNumber + 20000000) % 23);
    } else {
        expectedLetter = controlLetters.charAt(documentNumber % 23);
    }

    // Comprobar si la letra de control es correcta
    if (nif.charAt(nif.length - 1) !== expectedLetter) {
        return false; // Letra de control incorrecta
    }

    return true; // NIF/NIE válido
};
