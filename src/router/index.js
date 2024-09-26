import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/illnesses',
    name: 'Illnesses',
    component: () => import('@/views/IllnessesPage.vue')
  },
  {
    path: '/analyses',
    name: 'Analyses',
    component: () => import('@/views/AnalysesPage.vue'),
  },
  {
    path: '/analyses/filtered/:filterValue',
    name: 'AnalysisFiltered',
    props: (route) => {
      return {
        filterValue: route.params.filterValue,
      }
    },
    component: () => import('@/views/AnalysesPage.vue'),
  },
  {
    path: '/illness-edit/:id?',
    name: 'IllnessEdit',
    props: (route) => {
      return {
        id: route.params.id,
      }
    },
    component: () => import('@/views/IllnessEdit.vue'),
  },
  {
    path: '/analysis-edit/:id?',
    name: 'AnalysisEdit',
    props: (route) => {
      return {
        id: route.params.id,
      }
    },
    component: () => import('@/views/AnalysisEdit.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/AnalysesPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
