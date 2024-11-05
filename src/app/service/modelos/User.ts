export interface User {
    uid: number,
    displayName: string,
    email: string,
    photoURL: StreamPipeOptions,
    nickname: string,
    altura: number,
    peso: number,
    edad: number,
    nivelActividad: string,
    meta: string,
    genero: string,
    firstLoginStatus: boolean
}