export class Api {

    toJson<TResponse>(response: Response): Promise<TResponse> {
        return response.json()
    }

    getRequest<TResponse>(url : string, params : URLSearchParams = new URLSearchParams(), init : object = {}): Promise<TResponse> {
        if (JSON.stringify(init) === JSON.stringify({})) init = {credentials: "same-origin" }
        return fetch(url + params.toString(), init).then(response => this.toJson(response))
    }

    putRequest<TResponse>(url : string, init : object = {}, body : object) : Promise<TResponse> {
        JSON.stringify(init) === JSON.stringify({}) ? init = {
            credentials: 'same-origin',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "PUT",
            body: JSON.stringify(body)
        } : init = {
            ...init,
            method: "PUT",
            body: JSON.stringify(body)
        }
        return fetch(url, init).then(response => this.toJson(response))
    }

    postRequest<TResponse>(url : string, init : object = {}, body : object = {}) : Promise<TResponse> {
        JSON.stringify(init) === JSON.stringify({}) ? init = {
            credentials: 'same-origin',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(body)
        } : init = {
            ...init,
            method: "POST",
            body: JSON.stringify(body)
        }
        return fetch(url, init).then(response => this.toJson(response))
    }

    postFormRequest<TResponse>(url: string, init: object = {}, body: object = {}): Promise<TResponse> {
        JSON.stringify(init) === JSON.stringify({}) ? init = {
            credentials: 'same-origin',
            method: "POST",
            body: body
        } : init = {
            ...init,
            method: "POST",
            body: body
        }
        return fetch(url, init).then(response => this.toJson(response))
    }

    deleteRequest<TResponse>(url : string, init : object = {}, body : object = {}) : Promise<TResponse> {
        JSON.stringify(init) === JSON.stringify({}) ? init = {
            credentials: 'same-origin',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "DELETE",
            body: JSON.stringify(body)
        } : init = {
            ...init,
            method: "DELETE",
            body: JSON.stringify(body)
        }
        return fetch(url, init).then(response => this.toJson(response))
    }
}

interface RestAPI<Model> {
    getAll: () => Promise<Model[]>
    getOne: (id: string) => Promise<Model>
    create: (model: Partial<Model> & Model) => Promise<Model>
    update: (model: Partial<Model> & Model) => Promise<Model>
    delete: (id: string) => Promise<Model>
    filter: (condition: Partial<Model> & string & number & boolean) => Promise<Model[]>
}

// T is our interface, Pick<T, K> constructs a partial type with the key as the partial property and our interface
// Pick<Model, id> = type {id: string}
// this allows use to now have U -> an object with all partial properties as their own type
// So our type is has to be Partial of T BUT HAS TO HAVE one property in.

type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export class REST<Model extends {id: string}> extends Api implements RestAPI<Model>{

    public readonly path: string

    constructor(path: string) {
        super();
        this.path = path
    }

    create(model: Partial<Model> & Model): Promise<Model> {
        return this.postRequest<Model>(this.path, {}, model)
    }

    delete(id: string): Promise<Model> {
        return this.deleteRequest<Model>(this.path + "/" + id)
    }

    getAll(): Promise<Model[]> {
        return this.getRequest<Model[]>(this.path)
    }

    getOne(id: string): Promise<Model> {
        return this.getRequest<Model>(this.path + "/" + id)
    }

    update(model: Partial<Model>): Promise<Model> {
        return this.putRequest<Model>(this.path + "/" + model.id, {}, model)
    }

    filter (conditions: AtLeastOne<Model>): Promise<Model[]> {
        return this.getRequest(this.path + "/" + new URLSearchParams(conditions))
    }

}