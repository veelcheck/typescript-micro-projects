import { ChangeEvent, useState } from 'react';
import { useLocalStorage } from '../lib/hooks.ts';

const buttonStyle =
  'w-full sm:w-fit py-2 px-4 rounded-md font-bold text-white ';
const deleteButton = `bg-rose-600 hover:bg-rose-700 focus:bg-rose-700 ${buttonStyle}`;
const moveButton = `bg-emerald-800 hover:bg-emerald-900 focus:bg-emerald-900 ${buttonStyle}`;

const toUpperFirstLetter = (string: string) =>
  string
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

function Todo() {
  const [todos, setTodos] = useLocalStorage<string[]>('todos', []);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const [movingTodoIndex, setMovingTodoIndex] = useState<number | null>(null);

  const moveTodoUp = (index: number) => {
    setMovingTodoIndex(index);

    setTimeout(() => {
      if (index > 0) {
        const updatedTodos = [...todos];
        [updatedTodos[index], updatedTodos[index - 1]] = [
          updatedTodos[index - 1],
          updatedTodos[index],
        ];

        setTodos(updatedTodos);
        setMovingTodoIndex(null);
      }
    }, 800); // Adjust the delay to match a transition duration
  };

  const moveTaskDown = (index: number) => {
    if (index < todos.length - 1) {
      setMovingTodoIndex(index + 1);

      setTimeout(() => {
        const updatedTodos = [...todos];
        [updatedTodos[index], updatedTodos[index + 1]] = [
          updatedTodos[index + 1],
          updatedTodos[index],
        ];

        setTodos(updatedTodos);
        setMovingTodoIndex(null);
      }, 800); // Adjust the delay to match a transition duration
    }
  };

  return (
    <>
      <section className='flex flex-col gap-2 container mx-auto items-center md:justify-center min-h-screen p-2 font-mono'>
        <h1 className='text-4xl text-center text-amber-600 pt-8 md:pt-2'>
          Todo List for Busy People
        </h1>
        <form
          className='flex gap-2'
          onSubmit={addTodo}>
          <input
            className='border-2 border-amber-600 py-4 px-2 rounded-md w-60 sm:w-96 focus:outline-none focus:ring-4 focus:ring-green-800 focus:border-none bg-gray-300'
            id='new-todo-title'
            type='text'
            placeholder='add to the list...'
            value={newTodo}
            onChange={(e) => handleInputChange(e)}
          />
          <button
            type='submit'
            className='bg-amber-600 hover:bg-amber-900 focus:bg-amber-900 px-4 rounded-md text-amber-50 font-bold'>
            Add
          </button>
        </form>
        <ul className='space-y-2 min-h-24'>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex flex-col sm:flex-row items-center gap-1 md:gap-2 p-2 rounded-md font-bold text-2xl bg-gray-300 ${
                movingTodoIndex !== null &&
                (index === movingTodoIndex || index === movingTodoIndex - 1)
                  ? 'opacity-0'
                  : ''
              }`}
              style={{
                transition: 'opacity 0.8s ease-in-out',
              }}>
              <span className=' min-w-72 text-center sm:text-left flex-1'>
                {toUpperFirstLetter(todo)}
              </span>
              <div className='flex gap-2'>
                <button
                  className={deleteButton}
                  onClick={() => deleteTodo(index)}>
                  Delete
                </button>
                <button
                  className={moveButton}
                  onClick={() => moveTodoUp(index)}>
                  Up
                </button>
                <button
                  className={moveButton}
                  onClick={() => moveTaskDown(index)}>
                  Down
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Todo;
