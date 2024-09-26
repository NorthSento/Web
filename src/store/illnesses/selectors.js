export const fetchItems = (store) => {
  const { dispatch } = store;
  dispatch('illnesses/fetchItems');
};

export const selectItems = (store) => {
  const { getters } = store;
  return getters['illnesses/items']
}

export const removeItem = (store, id) => {
  const { dispatch } = store;
  dispatch('illnesses/removeItem', id);
}

export const addItem = (store, { name, analysis }) => {
  const { dispatch } = store;
  dispatch('illnesses/addItem', { name, analysis });
}

export const updateItem = (store, { id, name, analysis }) => {
  const { dispatch } = store;
  dispatch('illnesses/updateItem', { id, name, analysis });
}

export const selectItemById = (store, id) => {
  const { getters } = store;
  return getters['illnesses/itemsByKey'][id] || {};
}
