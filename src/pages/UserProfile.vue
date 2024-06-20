<template>
  <NavBar />
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-card class="mx-auto pa-12 pb-8" max-width="600" rounded="lg" elevation="8" title="Perfil do Usuário" subtitle="Atualize os seus dados">
        <v-row>
          <v-col>
            <v-text-field
              label="Nome"
              v-model="nome"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            label="E-mail"
            type="email"
            v-model="user.email"
            disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="URL da foto de perfil"
              v-model="photoLink"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="alertOk">
          <v-col>
            <v-alert
              type="success"
              title="Atualizado!"
              text="Perfil atualizado com sucesso!"
            >
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="alertError">
          <v-col>
            <v-alert
              type="warning"
              title="Falha!"
              text="Não foi possível atualizar o perfil!"
            >
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              block
              @click="updateUser"
            >
              Atualizar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/config'

export default {
  setup() {
    const nome = ref('')
    const photoLink = ref('')
    const alertOk = ref(false)
    const alertError = ref(false)

    const { user } = getUser()

    const updateUser = async () => {
      console.log('chamou....')
      await updateProfile(auth.currentUser, {
        displayName: nome.value,
        photoURL: photoLink.value
      }).then(() => {
        alertOk.value = true
      }).catch(() => {
        alertError.value = true
      });
    }

    return { nome, photoLink, user, updateUser, alertOk, alertError }
  },
  data() {
    return {
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      }
    }
  }
}
</script>

<style>

</style>
