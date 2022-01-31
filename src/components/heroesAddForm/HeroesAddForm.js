
import {Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import { useSelector} from 'react-redux';

import store from '../../store';
import { selectAll } from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';
import './heroesAddForm.scss';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [createHero] = useCreateHeroMutation();

    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // Один из фильтров нам тут не нужен
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <Formik
            initialValues = {{
                id: '',
                name: '',
                description: '',
                element: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
                description: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            })}
            onSubmit={(heroes, {resetForm}) => {
                heroes.id = uuidv4();
                createHero(heroes).unwrap();

                setTimeout(() => resetForm({
                    id: '',
                    name: '',
                    description: '',
                    element: ''
                }), 500)
                
            }}>
                    
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                </div>
                <ErrorMessage className="error" name="name" component="div"/>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        required
                        name="description" 
                        className="form-control" 
                        id="description" 
                        placeholder="Что я умею?"
                        as="textarea"
                        style={{"height": '130px'}}/>
                </div>
                <ErrorMessage className="error" name="text" component="div"/>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        required
                        className="form-select" 
                        id="element" 
                        name="element"
                        as="select">
                        <option >Я владею элементом...</option>
                        {renderFilters(filters, filtersLoadingStatus)}
                    </Field>
                </div>
                <ErrorMessage className="error" name="element" component="div"/>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;