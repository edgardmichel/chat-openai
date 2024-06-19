<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-card title="Texto" :subtitle="`Tokens Utilizados: (${totalTokens})`">
        <v-card-text>
          <template v-for="(text, index) in showText" :key="index">
          <v-row class="ma-3" :justify="text.origin === 'self' ? 'end' : 'start'">
            <v-card max-width="700" v-if="text.origin === 'self'">
              <v-card-text class="text-body-1">
                {{ text.text }}
                </v-card-text>
              <v-card-subtitle class="text-right">{{ text.title }}</v-card-subtitle>
            </v-card>
            <v-card max-width="700" v-else>
              <v-card-text class="text-body-1">
                {{ text.text }}
                </v-card-text>
              <v-card-subtitle>{{ text.title }}</v-card-subtitle>
            </v-card>
          </v-row>
          </template>
          <template v-if="waitingOpenAi">
            <v-card max-width="300">
              <v-card-subtitle>Aguardando resposta</v-card-subtitle>
              <v-card-text>
                <v-progress-linear
                  color="deep-purple-accent-4"
                  height="6"
                  indeterminate
                  rounded
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </template>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-textarea
            label="Texto"
            row-height="30"
            rows="2"
            variant="filled"
            auto-grow
            shaped
            v-model="userText"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row v-if="systemText === ''">
        <v-col cols="12">
          <v-textarea
            label="System"
            row-height="30"
            rows="2"
            variant="filled"
            auto-grow
            shaped
            v-model="systemText"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-select
            :items="models"
            density="compact"
            label="Model"
            v-model="modelSelecionado"
            :disabled="messagesTemp.length > 0"
          ></v-select>
        </v-col>
        <v-col>
          <v-btn @click="enviar">Enviar</v-btn>
        </v-col>
        <v-col v-if="messagesTemp.length > 0">
          <v-btn @click="resetForm">Reiniciar</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link to="/CadatroUsuario">Cadastro</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          userText -> {{ userText }}<br>
          modelSelecionado -> {{ modelSelecionado }}<br>
          systemText -> {{ systemText }}<br>
          assistanceText -> <pre>{{ assistanceText }}</pre>
          showText -> <pre>{{ showText }}</pre>
        </v-col>
        <v-col cols="6">
          messagesTemp -> <pre>{{ messagesTemp }}</pre>
        </v-col>
        <v-col cols="12">
          returnOpenAi
          <pre>{{ returnOpenAi }}</pre>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import OpenAI from 'openai'

export default {
  data: () => ({
    models: [
      { title: 'gpt-4o', value: 'gpt-4o' },
      { title: 'gpt-4-turbo', value: 'gpt-4-turbo' },
      { title: 'gpt-3.5-turbo-1106', value: 'gpt-3.5-turbo-1106' },
    ],
    userText: "",
    modelSelecionado: "",
    systemText: "",
    assistanceText: [],
    showText: [],
    returnOpenAi: [],
    messagesTemp: [],
    waitingOpenAi: false,
    totalTokens: 0,
  }),
  methods: {
    enviar() {
      /* var messagesTemp = [
        {"role": "system", "content": this.systemText},
        {"role": "user", "content": this.userText}
      ] */
      if(this.modelSelecionado === "" || this.userText === "") {
        alert("Você precisa escrever o texto e selecionar um model.")
      } else {
        this.waitingOpenAi = true
        let temp = {
          origin: 'self',
          title: 'Você',
          text: this.userText
        }
        this.showText.push(temp)
        this.montarMessages()
        setTimeout(() => {
          this.sendChatGpt();
        }, 500);
      }
    },
    montarMessages() {
      if(this.messagesTemp.length < 1) {
        if(this.systemText === "") { this.systemText = "Você é um assistente fantástico, inteligente e super criativo" }
        this.messagesTemp = [
          {"role": "system", "content": this.systemText},
          {"role": "user", "content": this.userText}
        ]
      } else {
        let tmp = {"role": "user", "content": this.userText}
        this.messagesTemp.push(tmp)
      }
    },
    enviarSystem(value) {
      let temp = {
        origin: 'system',
        title: 'OpenAI',
        text: value
      }
      this.showText.push(temp)
      this.waitingOpenAi = false
    },
    async sendChatGpt() {
      const openai = new OpenAI({
        apiKey: '',
        dangerouslyAllowBrowser: true
      });

      //
      const completion = await openai.chat.completions.create({
        messages: this.messagesTemp,
        model: this.modelSelecionado
      });
      console.log("completion -> ", completion)
      let tmp = { "role": "assistant", "content": completion.choices[0].message.content }
      this.messagesTemp.push(tmp)
      this.returnOpenAi.push(completion)
      this.enviarSystem(completion.choices[0].message.content)
      this.totalTokens = this.totalTokens + completion.usage.total_tokens
    },
    resetForm() {
      this.userText = ""
      this.modelSelecionado = ""
      this.systemText = ""
      this.showText = []
      this.returnOpenAi = []
      this.messagesTemp = []
      this.totalTokens = 0
    }
  }
}
</script>

<style>

</style>
