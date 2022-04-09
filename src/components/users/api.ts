import {Api, REST} from "../../api/Api";
import {User} from "./redux/interfaces";


class API<Model extends {id: string}> extends REST<Model>{

    constructor(path: string) {
        super(path);
    }
    // add additional api methods here

}

export const endpoint = new API<User>("https://gorest.co.in/public/v2/users")