//Funcion para generar un id aleatorio
export const generarId=()=> Date.now().toString(32) + Math.random().toString(32).substring(2);