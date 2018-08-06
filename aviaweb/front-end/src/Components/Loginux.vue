<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
     <h3>{{logged}}</h3>
   </form>
 </div>
</template>

<script>
  export default{
    data:function(){
      return{
        username: '',
        password: '',
        usertoken:''
      }
    },
    computed:{
      logged: function(){
        return this.$store.getters.logged;
      }
    },
    methods:{
      search(){
        this.$store.dispatch('search', this.querry,);
        this.answer = this.$store.getters.results
      },
      login(){
        this.$auth.setToken('123')
        console.log(this.$auth)
        console.log(this.$auth.getToken())
        this.$store.dispatch('login', {name:this.username, pass:this.password})
      }
    },
    created() {
      //this.$store.dispatch('search', this.querry,);
    },
  }

</script>