import { Link } from 'react-router-dom';
import ProjectLink from './components/homePage-additional/ProjectLink';

function HomePage() {
  return (
    <section className='container p-2 mx-auto font-mono text-center mt-6'>
      <h1 className='text-amber-50 uppercase font-bold '>
        Small projects to practice TypeScript
      </h1>
      <ul className='flex flex-col gap-4 mt-4 items-center'>
        <ProjectLink
          to='todo'
          title='Todo App'
          description='A simple todo app built for when your memory leaks.'
        />
        <ProjectLink
          to='snake-for-alice'
          title='Snake Game'
          description='A classic snake game built for Alice for her birthday. Plus every dev needs to write it at least once, right?'
        />
      </ul>
    </section>
  );
}

export default HomePage;
