<template>
  <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
    <AnalysisForm
        :id="id"
        @submit="onSubmit"
    />
  </Layout>
</template>

<script>
import { useStore } from 'vuex';

import { updateItem, addItem } from '@/store/analyses/selectors';
import Layout from '@/components/Layout/Layout';
import AnalysisForm from '@/components/AnalysisForm/AnalysisForm.vue';
export default {
  name: 'AnalysisEdit',
  props: {
    id: String,
  },
  components: {
    Layout,
    AnalysisForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: function ({id, imgPath, file, name, illnessId, description, cost}) {
        id ?
            updateItem(store, {
              id, imgPath, file, name,
              illnessId, description, cost
            }) :
            addItem(store, {
              imgPath, file, name,
              illnessId, description, cost
            });
      }
    };
  }
}
</script>

