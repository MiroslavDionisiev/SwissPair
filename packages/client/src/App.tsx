import './app.module.css';
import './index.css';

export function App() {
  return (
    <div>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
        test themes
      </div>
      <h1 className="text-black dark:text-white">Header 1</h1>
      <h2 className="text-black dark:text-yellow-400">Header 2</h2>
      <div className="bg-black dark:bg-yellow-400 text-white dark:text-black">
        Black in light, yellow in dark
      </div>
      <div className="bg-yellow-400 dark:bg-black text-black dark:text-yellow-400">
        Yellow in light, black in dark
      </div>
    </div>
  );
}
  