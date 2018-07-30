<template>
    <div id="ResponseGreed">
        <div  v-for="(post, index1) in posts" :key="index1">
            <span>{{ post.id }}</span> 
            <h3>{{ post.title }}</h3> 
            <p>{{ post.body }}</p> 
        </div>
        <div class="editor">
            <form @submit.prevent="savePost()">
                <input type="text" placeholder="Заголовок" v-model="post.title">
                <textarea placeholder="Заголовок" v-model="post.body"></textarea>
                <button>Опубликовать</button>
            </form> 
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Responseview',
        data () {  
            return{ 
                errors:[],
                posts:[],
                post:{}
            }           
        },
        methods:{
            savePost(){
                axios.post('https://jsonplaceholder.typicode.com/posts', this.post)
            },
            getPost(){
                var options ={
                    params:{
                        _start: 10,
                        _limit: 5
                    },
                    headers:{
                        'Content-Type' : 'application/json'
                    }
                }
                axios.get('https://jsonplaceholder.typicode.com/posts', options)
                .then((resp) => {
                    this.posts = resp.data;
                })
                .catch((err) => {
                    console.log(err)
                    this.errors.push(err);
                })
            } 
        },
        created: function() {
            this.getPost();
        }
    }
</script>

