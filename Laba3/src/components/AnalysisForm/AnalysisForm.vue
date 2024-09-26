<template>
  <div :class="$style.root">
    <div v-if="form.id" :class="$style.item">
      <div :class="$style.label">
        <label for="id">id</label>
      </div>
      <input :value="form.id" disabled :class="$style.input" id="id" placeholder="id" type="text">
    </div>
    <div :class="$style.item">
      <div :class="$style.label">
        <label v-if="form.id" for="imgPath">Замещающая картинка</label>
        <label v-else for="imgPath">Картинка</label>
      </div>
      <input id="imgPath" ref="file" :class="$style.input" accept="image/png"
             type="file" @change="onChangeFile">
      <Btn theme="btn-deepkoamaru" @click="onDeleteFile">Очистить</Btn>
    </div>
    <div :class="$style.item">
      <div :class="$style.label">
        <label for="name">Название</label>
      </div>
      <input v-model="form.name" :class="$style.input" id="name" placeholder="Название" type="text">
      <span v-if="errors.name" :class="$style.error">{{ errors.name }}</span>
    </div>

    <div :class="$style.item">
      <div :class="$style.label">
        <label for="illnessId">Болезнь</label>
      </div>
      <select v-model="form.illnessId" :class="$style.select" name="illnessId" id="illnessId">
        <option v-for="({ name, id }) in illnessList" :key="id" :value="id">
          {{ name }}
        </option>
      </select>
      <span v-if="errors.illnessId" :class="$style.error">{{ errors.illnessId }}</span>
    </div>

    <div :class="$style.item">
      <div :class="$style.label">
        <label for="description">Описание</label>
      </div>
      <input v-model="form.description" :class="$style.input" id="description" placeholder="Описание" type="text">
      <span v-if="errors.description" :class="$style.error">{{ errors.description }}</span>
    </div>

    <div :class="$style.item">
      <div :class="$style.label">
        <label for="cost">Стоимость</label>
      </div>
      <input v-model="form.cost" :class="$style.input" id="cost" placeholder="Стоимость" type="text">
      <span v-if="errors.cost" :class="$style.error">{{ errors.cost }}</span>
    </div>
    <div :class="$style.item">
      <Btn @click="onClick" theme="info">Сохранить</Btn>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onBeforeMount, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { selectItemById, fetchItems} from '@/store/analyses/selectors';
import { selectItems as selectIllnesses, fetchItems as fetchIllnesses } from '@/store/illnesses/selectors';

import Btn from '@/components/Btn/Btn';

export default {
  name: 'AnalysisForm',
  components: {
    Btn,
  },
  props: {
    id: { type: String, default: '' },
  },
  methods: {
    onChangeFile(event) {
      this.imgPath = this.$refs.file.value;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.form.file = event.target.result;
      }
    },
    onDeleteFile() {
      this.$refs.file.value = '';
      this.form.file = '';
    }
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const illnessList = computed(() => selectIllnesses(store));
    const form = reactive({
      id: '',
      imgPath: '',
      name: '',
      illnessId: '',
      description: '',
      cost: '',
    });

    const errors = reactive({
      id: '',
      imgPath: '',
      name: '',
      illnessId: '',
      description: '',
      cost: '',
    });

    const validateForm = () => {
      let isValid = true;
      errors.name = form.name ? '' : 'Название обязательно';
      errors.illnessId = form.illnessId ? '' : 'Выберите болезнь';
      errors.description = form.description ? '' : 'Описание обязателен';
      errors.cost = form.cost ? '' : 'Стоимость обязательна';
      isValid = !errors.name && !errors.description && !errors.illnessId && !errors.cost;
      return isValid;
    };

    const isValidForm = computed(() => validateForm());


    onBeforeMount(() => {
      fetchItems(store);
      fetchIllnesses(store);
    });

    watchEffect(() => {
      const analysis = selectItemById( store,  props.id );
      Object.keys(analysis).forEach(key => {
        form[key] = analysis[key]
      })

    });

    const onClick = () => {
      if (validateForm()) {
        context.emit('submit', form);
        router.push({name: 'Analyses'});
      }
    }

    return {
      illnessList,
      form,
      errors,
      isValidForm,
      onClick,
    }

  }
}
</script>

<style module lang="scss">
.root {
  padding-top: 30px;
  max-width: 900px;

  .item {
    display: flex;
    align-items: center;

    & + .item {
      margin-top: 15px;
    }
  }

  .label {
    flex: 0 0 150px;
  }

  .input {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .select {
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    appearance: none;
  }

  .error {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
    margin-left: 5px;
  }

}
</style>
