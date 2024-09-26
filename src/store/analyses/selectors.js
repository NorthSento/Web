export const fetchItems = ( store ) => {
  const { dispatch } = store;
  dispatch('analyses/fetchItems');
};

export const fetchFilteredItems = (store, filterValue) => {
  const {dispatch} = store;
  dispatch('analyses/fetchFilteredItems', filterValue);
}

export const selectItems = ( store ) => {
  const { getters } = store;
  return getters['analyses/items']
}

export const removeItem = ( store, id ) => {
  const { dispatch } = store;
  dispatch('analyses/removeItem', id);
}

export const addItem = ( store, { imgPath, file, name, illnessId, description, cost } ) => {
  const { dispatch } = store;
  dispatch('analyses/addItem', { imgPath, file, name, illnessId, description, cost });
}

export const updateItem = ( store, { id, file, imgPath, name, illnessId, description, cost }) => {
  const { dispatch } = store;
  dispatch('analyses/updateItem', { id, file, imgPath, name, illnessId, description, cost });
}

export const selectItemById = (store, id) => {
  const { getters } = store;
  return getters['analyses/itemsByKey'][id] || {};
}
