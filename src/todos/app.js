import html from './app.html?raw';      // Con el ?raw -> en crudo. Sino da fallo
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const elementIDs = {
    CrearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    // Recargar/renderizar los todos:
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIDs.PendingCountLabel);
    }

    // Función anónima autoinvocada --- Cuando se llama a la función App() 
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;    // Creo el fichero app.html lo importo y lo uso
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML:
    const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput);
    const todoListUL = document.querySelector(elementIDs.TodoList);
    const clearCompletedButton = document.querySelector(elementIDs.CrearCompleted);
    const filtersLIs = document.querySelectorAll(elementIDs.TodoFilters);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        // Saber el ID de donde se hace click:
        const element = event.target.closest('[data-id]');    // El padre más cercano que tenga data-id
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));

        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch(element.target.text) {   // TODO Coger el ID o el href (si cambia el idioma -> mal)
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;
            }
            displayTodos();
        });
    });
}