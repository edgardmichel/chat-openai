<template>
  <v-container class="fill-height">
    <v-card class="mx-auto pa-10" width="500" rounded="lg" elevation="8" title="Novo Usuário" subtitle="Formulário de cadastro">
      <v-row>
        <v-col>
          <v-text-field
            label="E-mail"
            type="email"
            hint="Digite o seu e-mail"
            :rules="[rules.required, rules.email]"
            v-model="email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Senha"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            counter
            @click:append="show1 = !show1"
            hint="At least 8 characters"
            v-model="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="error">
        <v-col>
          <v-alert
            type="warning"
            title="Erro"
          >
          {{ error }}
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
            @click="handleSubmit"
          >
            Cadastrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useSignup from '@/composables/useSignup';

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const { signup, error } = useSignup()
    const router = useRouter()

    const handleSubmit = async () => {
      await signup(email.value, password.value)

      if(!error.value) {
        router.push('/')
      }
    }

    return { email, password, handleSubmit, error }
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
  },
  methods: {
    required (v) {
      return !!v || 'Field is required'
    },
  }
}
</script>

<style>

</style>
