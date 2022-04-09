import {Api, REST} from "../../api/Api";
import {Model} from "./redux/interfaces";


class API<Model extends {id: string}> extends REST<Model>{

    constructor(path: string) {
        super(path);
    }
    // add additional api methods here

}

export const endpoint = new API<Model>("/")