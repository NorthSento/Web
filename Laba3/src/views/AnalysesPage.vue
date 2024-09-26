<template>
  <Layout title="Анализы">
    <Layout v-if="filterValue" :title="filterValue">
      <AnalysisList :filterValue="filterValue"/>
    </Layout>
    <AnalysisList v-else/>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout/Layout';
import AnalysisList from '@/components/AnalysisList/AnalysisList.vue';


export default {
  name: 'AnalysisPage',
  props: {
    filterValue: String
  },
  components: {
    Layout,
    AnalysisList
  }
}
</script>
