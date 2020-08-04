import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IPost {
    // attributes from http://jsonplaceholder.typicode.com/posts
    id: number;
    userId: number;
    title: string;
    body: string;
}

let baseUri: string = "http://jsonplaceholder.typicode.com/posts"

// https://alligator.io/vuejs/rest-api-axios/
new Vue({
    el: '#app',
    data: {
        posts: [],
        errors: [],
        userId: ""
    },
    created() { // created() is a life cycle method, not an ordinary method
        console.log("created method called")
        axios.get<IPost[]>(baseUri)
            .then((response: AxiosResponse<IPost[]>) => {
                console.log(response.data)
                this.posts = response.data
            })
            .catch((e: AxiosError) => {
                this.errors.push(e)
            });
    },
    methods: {
        cleanList() {
            this.posts = []
        },
        getByUserId(uid: number) {
            let uri = baseUri+ "?userId=" + uid;
            console.log("getByUserId: " + uri);
            axios.get<IPost[]>(uri)
                .then((response: AxiosResponse<IPost[]>) => {
                    console.log(response.data)
                    this.posts = response.data
                })
                .catch((e: AxiosError) => {
                    this.errors.push(e)
                });
        }
    }
})