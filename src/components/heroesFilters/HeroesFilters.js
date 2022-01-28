import { v4 as uuidv4 } from 'uuid';

import { useEffect } from "react";
import classNames from 'classnames';
import { heroesActiveFiltered, filtersFetching, filtersFetched, filtersFetchingError} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from "../spinner/Spinner";
import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({name, label, className}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button key={uuidv4()}  
                            className={btnClass}
                            onClick={() => dispatch(heroesActiveFiltered(name))}
                            >{label}</button>
        })
    }

    const elements = renderFilters(filters);
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                        {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;