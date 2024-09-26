<template>
  <Layout title="Список болезней">
    <IllnessList />
  </Layout>
</template>

<script>
import Layout from '@/components/Layout/Layout';
import IllnessList from '@/components/IllnessList/IllnessList.vue';

export default {
  name: 'Illnesses',
  components: {
    Layout,
    IllnessList,
  }
}
</script>
