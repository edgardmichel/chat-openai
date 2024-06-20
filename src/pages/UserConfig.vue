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
              label="OpenAI API Key"
              v-model="apikey"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="alertOk">
          <v-col>
            <v-alert
              type="success"
              title="Atualizado!"
              text="Atualizado com sucesso!"
            >
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="alertError">
          <v-col>
            <v-alert
              type="warning"
              title="Falha!"
              text="Não foi possível atualizar!"
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
              @click="handleUpdate"
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
import { db } from '@/firebase/config';
import getUser from '@/composables/getUser'
import { addDoc, collection } from 'firebase/firestore';

export default {
  setup() {
    const apikey = ref('')
    const { user } = getUser()
    const alertOk = ref(false)
    const alertError = ref(false)

    const handleUpdate = async () => {
      const colRef = collection(db, 'usuarios')

      await addDoc(colRef, {
        openaikey: apikey.value,
        userID: user.value.uid
      }).then(() => {
        alertOk.value = true;
      }).catch(() => {
        alertError.value = true;
      });
    }

    return { apikey, handleUpdate, alertOk, alertError }
  }
}
</script>

<style>

</style>
