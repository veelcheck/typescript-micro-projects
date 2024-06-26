import ProjectLink from './components/ProjectLink.tsx';

function HomePage() {
  return (
    <section className='container p-2 mx-auto font-mono text-center min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-amber-50 uppercase font-bold text-3xl'>
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
        <ProjectLink
          to='child-to-parent'
          title='Child to Parent'
          description="Are you a parent? You think you're the top layer, but the children! Oh, they can talk back. This one is doing just that. It's probably a teenager. How do you React, component?"
        />
        <ProjectLink
          to='hook-form'
          title='React Hook Form'
          description='Well, a React Hook Form.'
        />
      </ul>
    </section>
  );
}

export default HomePage;
