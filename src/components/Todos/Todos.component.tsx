import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

//icons
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

// Interface
import { Todo } from "../../interfaces/todo";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { register, handleSubmit, resetField } = useForm<{ title: string }>();

  const handleAddClick = (data: { title: string }) => {
    console.log(data);
    setTodos((prev) => [
      ...prev,
      { id: uuid(), title: data.title, isCompleted: false },
    ]);

    resetField("title");
  };

  const handleDeleteClick = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-screen h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4 rounded-md bg-gray-800 gap-6">
        <h1 className="text-2xl text-gray-50">Minhas tarefas</h1>
        <div className="flex items-center gap-4">
          <input
            className="rounded-md p-3 text-gray-50 bg-gray-600"
            type="text"
            placeholder="Digite a tarefa"
            {...register("title", { required: true })}
          />
          <button
            aria-label="Adicionar tarefa"
            onClick={() => handleSubmit(handleAddClick)()}
          >
            <AiOutlinePlus className="text-gray-50" size={24} />
          </button>
        </div>
        {todos.map((todo) => (
          <div
            className="flex items-center gap-4 w-full justify-between"
            key={todo.id}
          >
            <p className="text-gray-50 w-full bg-gray-700 p-4 rounded-md">
              {todo.title}
            </p>

            <button
              aria-label={`Deletar tarefa: ${todo.title}`}
              onClick={() => handleDeleteClick(todo.id)}
            >
              <AiOutlineDelete size={24} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
