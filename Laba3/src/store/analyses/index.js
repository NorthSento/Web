import api from './api';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    items: state => state.items,
    itemsByKey: state => state.items.reduce((res, cur) => {
      res[cur['id']] = cur;
      return res;
    }, {}),
  },
  mutations: {
    setItems: (state, items) => {
      state.items = items;
    },
    addItem: (state, item) => {
      state.items.push(item);
    },
    removeItem: (state, idRemove) => {
      state.items = state.items.filter(({ id }) => id !== idRemove);
    },
    updateItem: (state, updateItem) => {
      const index = state.items.findIndex(item => +item.id === +updateItem.id);
      state.items[index] = updateItem;
    }
  },
  actions: {
    fetchItems: async ({ commit }) => {
      const response = await api.analyses();
      const items = await response.json();
      commit('setItems', items)
    },
    fetchFilteredItems: async ({commit}, filterValue) => {
      const response = await api.analysesFiltered(filterValue);
      const items = await response.json();
      commit('setItems', items);
    },
    removeItem: async ({ commit }, id) => {
      const idRemovedItem = await api.remove( id );
      commit('removeItem', idRemovedItem);
    },
    addItem: async ({ commit }, { imgPath, file, name, illnessId, description, cost }) => {
      const item = await api.add({ imgPath, file, name, illnessId, description, cost });
      commit('addItem', item);
    },
    updateItem: async ({ commit }, { id, imgPath, file, name, illnessId, description, cost }) => {
      const item = await api.update({ id, imgPath, file, name, illnessId, description, cost });
      commit('updateItem', item);
    }
  },
}
