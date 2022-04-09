export interface State {
    users: Array<User>,
    user?: User,
    userInput?: number
}

export interface User {
    id: string
    name: string
    email: string
    gender: string
    status: string
}