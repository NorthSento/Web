import Api from '@/api/index';

class Analyses extends Api {

  /**
   * Вернет список всех анализов
   * @returns {Promise<Response>}
   */

  analyses = () => this.rest('/analyses/list.json');


  /**
   * Вернет отфильтрованный список анализов
   * @returns {Promise<Response>}
   */
  analysesFiltered = (filterValue) => this.rest('/analyses/list.json/' + filterValue);



  /**
   * Удалит анализ по id
   * @param id
   * @returns {Promise<*>}
   */
  remove = ( id ) => this.rest('/analyses/delete-item', {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify({ id }),
  }).then(() => id) // then - заглушка, пока метод ничего не возвращает

  /**
   * Создаст новую запись в таблице
   * @param analysis объект анализа, взятый из AnalysisForm
   * @returns {Promise<Response>}
   */
  add = ( analysis ) => this.rest('/analyses/add-item', {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(analysis),
  }).then(() => ({...analysis, id: new Date().getTime()})) // then - заглушка, пока метод ничего не возвращает

  /**
   * Отправит измененную запись
   * @param analysis объект анализа, взятый из AnalysisForm
   * @returns {Promise<*>}
   */
  update = ( analysis ) => this.rest('/analyses/update-item', {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(analysis),
  }).then(() => analysis) // then - заглушка, пока метод ничего не возвращает

}

export default new Analyses();
