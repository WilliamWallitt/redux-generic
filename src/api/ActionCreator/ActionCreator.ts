export function actionCreator<T>(type: string) {
    return (payload: T) => ({ type, payload });
}