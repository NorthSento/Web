  <template>

    <div :class="$style.root">
      <form>
        <label for="illness">Болезнь:</label>
        <input type="text" id="illness">

        <Btn  @click="onClickFilter" theme="info">Применить фильтр</Btn>
      </form>
    </div>

    <div :class="$style.root">
      <Table
          :headers="[
            {value: 'id', text: 'ID'},
            {value: 'img', text: 'Картинка'},
            {value: 'name', text: 'Название'},
            filterValue ? {value: 'illness', text: 'Болезнь'} : {value: 'illness', text: 'Болезнь', rLink: 'AnalysesFiltered'},
            {value: 'description', text: 'Описание'},
            {value: 'cost', text: 'Стоимость'},
            {value: 'control', text: 'Действие'},
          ]"
          :items="items"
      >
        <template v-slot:img="{ item }">
          <img v-if="item.imgPath" :alt="item.imgPath" :src="'http://localhost/rest/files/' + item.imgPath" style="max-width: 100px; max-height: 100px;">
          <img v-else alt="no_img.jpg" src="http://localhost/rest/files/no_img.jpg" style="max-width: 100px; max-height: 100px;">
        </template>


        <template v-slot:illness="{ item }">
          <RouterLink :to="{ name: 'AnalysisFiltered', params: { filterValue: item.illnessId } }">
            {{ item.illness}}
          </RouterLink>
        </template>

        <template v-slot:control="{ item }">
          <Btn @click="onClickEdit(item.id)" theme="info">Изменить</Btn>
          <Btn @click="onClickRemove(item.id)" theme="danger">Удалить</Btn>
        </template>
      </Table>

      <div :class="$style.createContainer">
        <RouterLink :to="{ name: 'AnalysisEdit' }">
          <Btn :class="$style.create" theme="info">Создать</Btn>
        </RouterLink>
      </div>

    </div>
  </template>

  <script>
  import { useStore } from 'vuex';
  import { computed, onMounted} from 'vue';
  import { useRouter, useRoute } from 'vue-router';


  import { selectItems, removeItem, fetchItems, fetchFilteredItems  } from '@/store/analyses/selectors'

  import Table from '@/components/Table/Table';
  import Btn from '@/components/Btn/Btn';
  export default {
    name: 'AnalysisList',
    components: {
      Btn,
      Table,
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();

      onMounted(() => {
        if (route.params.filterValue) fetchFilteredItems(store, route.params.filterValue);
        else fetchItems(store);
      });



      const items = computed(() => selectItems(store));

      const onClickRemove = id => {
        const isConfirmRemove = confirm('Вы действительно хотите удалить запись?')
        if (isConfirmRemove) {
          removeItem(store, id)
        }
      };

      const onClickEdit = id => {
        router.push({ name: 'AnalysisEdit', params: { id } });
      };

      const onClickFilter = () => {
        const filterValue = document.getElementById('illness').value; // Получаем значение фильтра
        if (filterValue) {
          router.push({ name: 'AnalysisFiltered', params: { filterValue } });
        } else {
          fetchItems(store);
        }
      };



      return {
        items,
        onClickRemove,
        onClickEdit,
        onClickFilter
      };
    }
  }
  </script>

  <style module lang="scss">
  .root {
    margin-bottom: 16px;

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 16px;

      > * {
        margin: 10px;
      }
    }
  }

  .createContainer {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  </style>

