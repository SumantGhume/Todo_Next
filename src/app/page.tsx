'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Todo = {
  _id: string;
  title: string;
  description: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const router = useRouter();

  // Function to show a todo
  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/Todo');
      console.log('Todo List: ', response.data);
      setTodos(response.data.todos); // ✅ Make sure your backend returns todos, not todo
    } catch  {
      toast.error('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async () => {
    
    if (!newTodo.title || !newTodo.description) {
      toast.error('Title and description are required');
      return;
    } 

    try {
      const response = await axios.post('/api/Todo', newTodo);
      toast.success(response.data.message);
      setTodos([...todos, response.data.todo]);
      setNewTodo({ title: '', description: '' });
    } catch  {
      toast.error('Failed to add todo');
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id: string) => {
    try {
      const response = await axios.delete(`/api/Todo?id=${id}`);
      toast.success(response.data.message);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch {
      toast.error('Failed to delete todo');
    }
  };  

  // Function to redirect to edit page
  const redirectToEditPage = (id: string) => {
    router.push(`/Edit_Todo/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-400 to-purple-300 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>

        {/* Add Todo Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={addTodo}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <Plus size={18} className="mr-2" />
              Add Todo
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                <p className="text-gray-600">{todo.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => redirectToEditPage(todo._id)}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}