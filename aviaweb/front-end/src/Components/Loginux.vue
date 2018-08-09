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
     <h3>{{usertoken}}</h3>
   </form>
 </div>
</template>

<script>
  export default{
    data:function(){
      return{
        username: '',
        password: '',
        token:''
      }
    },
    computed:{
      logged: function(){
        return this.$store.getters.logged;
      },
      usertoken: function(){
        return this.$store.getters.userToken;
      }
    },
    methods:{
      search(){
        this.$store.dispatch('search', this.querry,);
      },
      async login(){       
        let response = await this.$store.dispatch('login', {name:this.username, pass:this.password});
        this.token = response;
        // Если пройдена авторизация, то показать TODO: Страницу приветствия
        if(this.token != 'AuthError'){
          this.$router.push({ name: '/loginux', query: { redirect: '/table' } });
          this.$router.push(this.$route.query.redirect)
        }
      }
    }/* ,
    async beforeDestroy() {
        await this.$store.dispatch('logout');
        console.log(this.$store.state.userToken)
    } */
  }

</script>