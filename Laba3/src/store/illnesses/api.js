import Api from '@/api/index';

class Illnesses extends Api {

  /**
   * Вернет список всех болезней
   * @returns {Promise<Response>}
   */
  illnesses = () => this.rest('/illnesses/list.json');

  /**
   * Удалит болезнь по id
   * @param id
   * @returns {Promise<*>}
   */
  remove = ( id ) => this.rest('/illnesses/delete-item', {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify({ id }),
  }).then(() => id) // then - заглушка, пока метод ничего не возвращает

  /**
   * Создаст новую запись в таблице
   * @param illness объект болезни, взятый из IllnessForm
   * @returns {Promise<Response>}
   */
  add = ( illness ) => this.rest('/illnesses/add-item', {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(illness),
  }).then(() => ({...illness, id: new Date().getTime()})) // then - заглушка, пока метод ничего не возвращает

  /**
   * Отправит измененную запись
   * @param illness объект болезни, взятый из IllnessForm
   * @returns {Promise<*>}
   */
  update = ( illness ) => this.rest('/illnesses/update-item', {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(illness),
  }).then(() => illness) // then - заглушка, пока метод ничего не возвращает

}

export default new Illnesses();
