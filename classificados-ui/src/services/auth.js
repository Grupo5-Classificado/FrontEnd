export const usuarioAutenticado = () => localStorage.getItem('xxxxxxxxxxxxx') !== null;

export const parseJwt = () => {

    let base64 = localStorage.getItem('xxxxxxxxxxxxxxxx').split('.')[1];

    return JSON.parse(window.atob(base64));
}