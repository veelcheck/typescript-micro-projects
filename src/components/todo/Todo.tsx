import { ChangeEvent, useState } from 'react';
import { useLocalStorage } from '../../lib/hooks.ts';
import HomeButton from '../HomeButton.tsx';

const toUpperFirstLetter = (string: string) =>
  string
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

function Todo() {
  const [todos, setTodos] = useLocalStorage<string[]>('todos', []);
  const [newTodo, setNewTodo] = useState<string>('');
  const [completedTodos, setCompletedTodos] = useLocalStorage<boolean[]>(
    'completedTodos',
    []
  );
  const [movingTodoIndex, setMovingTodoIndex] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setCompletedTodos([...completedTodos, false]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setCompletedTodos(updatedCompletedTodos);
  };

  const toggleCompleteTodo = (index: number) => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos[index] = !updatedCompletedTodos[index];
    setCompletedTodos(updatedCompletedTodos);
  };

  const moveTodoUp = (index: number) => {
    setMovingTodoIndex(index);

    setTimeout(() => {
      if (index > 0) {
        const updatedTodos = [...todos];
        const updatedCompletedTodos = [...completedTodos];
        [updatedTodos[index], updatedTodos[index - 1]] = [
          updatedTodos[index - 1],
          updatedTodos[index],
        ];
        [updatedCompletedTodos[index], updatedCompletedTodos[index - 1]] = [
          updatedCompletedTodos[index - 1],
          updatedCompletedTodos[index],
        ];

        setTodos(updatedTodos);
        setCompletedTodos(updatedCompletedTodos);
        setMovingTodoIndex(null);
      }
    }, 800); // Adjust the delay to match a transition duration
  };

  const moveTaskDown = (index: number) => {
    if (index < todos.length - 1) {
      setMovingTodoIndex(index + 1);

      setTimeout(() => {
        const updatedTodos = [...todos];
        const updatedCompletedTodos = [...completedTodos];
        [updatedTodos[index], updatedTodos[index + 1]] = [
          updatedTodos[index + 1],
          updatedTodos[index],
        ];
        [updatedCompletedTodos[index], updatedCompletedTodos[index + 1]] = [
          updatedCompletedTodos[index + 1],
          updatedCompletedTodos[index],
        ];

        setTodos(updatedTodos);
        setCompletedTodos(updatedCompletedTodos);
        setMovingTodoIndex(null);
      }, 800); // Adjust the delay to match a transition duration
    }
  };

  return (
    <>
      <section className='flex flex-col gap-2 container mx-auto items-center justify-center min-h-screen p-2 font-mono'>
        <h1 className='text-4xl text-center text-amber-600 pt-8 md:pt-2'>
          Todo List for Busy People
        </h1>
        <form
          className='flex gap-2'
          name='todo-form'
          onSubmit={addTodo}>
          <input
            className='border-2 border-amber-600 py-4 px-2 rounded-md w-60 sm:w-96 focus:outline-none focus:ring-4 focus:ring-green-800 focus:border-none bg-gray-300'
            id='new-todo-title'
            type='text'
            placeholder='add to the list...'
            value={newTodo}
            onChange={handleInputChange}
          />
          <button
            type='submit'
            className='bg-amber-600 hover:bg-amber-900 focus:bg-amber-900 px-4 rounded-md text-amber-50 font-bold'>
            Add
          </button>
        </form>
        <ul className='space-y-2 min-h-24 pb-8'>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex flex-col sm:flex-row items-center justify-between gap-1 md:gap-2 p-2 rounded-md font-bold text-2xl bg-gray-300 ${
                movingTodoIndex !== null &&
                (index === movingTodoIndex || index === movingTodoIndex - 1)
                  ? 'opacity-0'
                  : ''
              }`}
              style={{
                transition: 'opacity 0.8s ease-in-out',
              }}>
              <div className='flex justify-center items-center gap-2 min-w-72'>
                <input
                  type='checkbox'
                  id={index.toString()}
                  className='checkbox-custom'
                  checked={completedTodos[index]}
                  onChange={() => toggleCompleteTodo(index)}
                />
                <span
                  className={`text-center sm:text-left sm:flex-1 ${completedTodos[index] ? 'text-gray-500 line-through' : ''}`}>
                  {toUpperFirstLetter(todo)}
                </span>
              </div>
              <div className='flex gap-2'>
                <button
                  type='button'
                  className={`buttonStyle ${completedTodos[index] ? 'completedButtonDelete' : 'deleteButton'}`}
                  onClick={() => deleteTodo(index)}>
                  X
                </button>
                <button
                  type='button'
                  className={`buttonStyle ${completedTodos[index] ? 'completedButtonMove' : 'moveButton'}`}
                  onClick={() => moveTodoUp(index)}>
                  Up
                </button>
                <button
                  type='button'
                  className={`buttonStyle ${completedTodos[index] ? 'completedButtonMove' : 'moveButton'}`}
                  onClick={() => moveTaskDown(index)}>
                  Down
                </button>
              </div>
            </li>
          ))}
        </ul>
        <HomeButton />
      </section>
    </>
  );
}

export default Todo;
