import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Todos from "./Todos.component";

describe("todo", () => {
  it("should show my tasks message", () => {
    render(<Todos />);

    expect(screen.getByText("Minhas tarefas")).toBeInTheDocument();
  });

  it("should show input task", () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Digite a tarefa");

    expect(input).toBeInTheDocument();
  });

  it("should show de add task button", () => {
    render(<Todos />);

    const button = screen.queryByLabelText("Adicionar tarefa");

    expect(button).toBeInTheDocument();
  });

  it("should add new task on button click", async () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Digite a tarefa");

    const textTask = "tarefa 1";

    await userEvent.type(input, textTask);

    screen.getByDisplayValue(textTask);

    const addButton = screen.getByLabelText("Adicionar tarefa");

    await userEvent.click(addButton);

    screen.getByPlaceholderText("Digite a tarefa");

    screen.getByText("tarefa 1");

    expect(screen.queryAllByText("tarefa 1")).toHaveLength(1);
  });

  it("should add new task on press enter", async () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Digite a tarefa");

    const textTask = "tarefa 1";

    await userEvent.type(input, textTask);

    screen.getByDisplayValue(textTask);

    await userEvent.keyboard("{enter}");

    screen.getByPlaceholderText("Digite a tarefa");

    screen.getByText("tarefa 1");
  });

  it("should delete task on click bottom", async () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Digite a tarefa");

    const textTask = "tarefa 1";

    await userEvent.type(input, textTask);

    screen.getByDisplayValue(textTask);

    const addButton = screen.getByLabelText("Adicionar tarefa");

    await userEvent.click(addButton);

    screen.getByPlaceholderText("Digite a tarefa");

    screen.getByText(textTask);

    const deleteButton = screen.getByLabelText(`Deletar tarefa: ${textTask}`);

    await userEvent.click(deleteButton);

    expect(screen.queryByText(textTask)).not.toBeInTheDocument();
  });
});
