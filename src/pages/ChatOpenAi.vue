<template>
  <NavBar />
  <ChatGpt
    :propApiKey="documents[0].openaikey"
  />
</template>

<script>
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser'

export default {
  setup() {
    const { user } = getUser()

    const { documents } = getCollection(
      'usuarios',
      ['userID', '==', user.value.uid]
    )

    return { documents }
  }
}
</script>
