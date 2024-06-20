<template>
  <v-app-bar>
    <v-app-bar-title>OpenAI Frontend</v-app-bar-title>


    <v-btn @click="goToChat">ChatGPT</v-btn>
    <v-spacer></v-spacer>
    <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar>
          <v-img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          :subtitle="user.email"
          :title="user.displayName"
        >
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link>
          <v-list-item-title @click="goToPerfil">
            <v-icon icon="mdi-account"></v-icon>
            Perfil
          </v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title @click="goToConfig">
            <v-icon icon="mdi-cog"></v-icon>
            Configurações
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-icon icon="mdi-lifebuoy"></v-icon>
            Ajuda
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list-item>
        <v-switch
          v-model="darkmode"
          color="primary"
          hide-details
          false-value="light"
          true-value="dark"
        >
          <template v-slot:label>
            Alterar modo de cores
          </template>
        </v-switch>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item link>
          <v-list-item-title @click="handleLogout">
            <v-icon icon="mdi-logout-variant"></v-icon>
            Sair
          </v-list-item-title>
        </v-list-item>
      </v-list>

    </v-card>
  </v-menu>


  </v-app-bar>
</template>

<script>
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { user } = getUser()

    const router = useRouter()

    const handleLogout = () => {
      //console.log('logout...')
      signOut(auth)
      router.push('/login')
    }

    const goToPerfil = () => {
      router.push('/perfil')
    }

    const goToConfig = () => {
      router.push('/configuracoes')
    }

    const goToChat = () => {
      router.push('/chatopenai')
    }

    return { handleLogout, user, goToPerfil, goToChat, goToConfig }
  },
  data() {
    return {
      drawer: null,
      darkmode: "light"
    }
  },
}
</script>

<style>

</style>
