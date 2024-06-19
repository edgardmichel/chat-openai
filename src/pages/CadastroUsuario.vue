<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-card max-width="300" title="Novo Usuário" subtitle="Formulário de cadastro">
        <v-row>
          <v-col>
            <v-text-field
              label="E-mail"
              type="email"
              hint="Digite o seu e-mail"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="E-mail"></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
