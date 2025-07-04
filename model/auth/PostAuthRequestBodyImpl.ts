import {PostAuthRequestBody} from "./PostAuthRequestBody";

export class PostAuthRequestBodyImpl implements PostAuthRequestBody {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
