import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold">LLM Workflow Builder</span>
                </div>
                <nav className="ml-6 flex space-x-8">
                  <a 
                    href="/" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </a>
                  <a 
                    href="/workflows" 
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    工作流
                  </a>
                  <a 
                    href="/about" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    About
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Router />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;