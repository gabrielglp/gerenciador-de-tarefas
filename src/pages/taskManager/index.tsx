import { useState, useEffect } from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";

import Head from "next/head";
import { Header } from "../../components/Header";

import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { FiRefreshCcw } from 'react-icons/fi';

import Modal from 'react-modal';

import { setupAPIClient } from "../../services/api";
import { ModalNewTask } from "../../components/ModalNewTask";

import 'animate.css';

    type TaskProps = {
        id: string;
        title: string;
        description: string;
        user_id: string;
    }

    interface HomeProps {
        initialTasks: TaskProps[];
    }

    export default function TaskManager({ initialTasks }: HomeProps) {

        const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);
        const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

        async function handleFinishItem() {
            const apiClient = setupAPIClient();
            
            try {
                const response = await apiClient.get('/tasks');
                console.log('Tipo de response.data:', Array.isArray(response.data));
                setTasks(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        }

        async function handleDeleteTask(id: string) {
            const apiClient = setupAPIClient();
            
            try {
                await apiClient.delete(`/tasks/${id}`);
                setTasks(tasks.filter(task => task.id !== id));
            } catch (error) {
                console.error("Erro ao deletar tarefa:", error);
            }
        }

        function handleEditTask () {
            alert('teste')
        }

        async function handleAddTask(title: string, description: string) {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.post('/tasks', { title, description, user_id: "6e915d08-f0b2-424f-9df7-492fd59ba954" });
                setTasks([...tasks, response.data]);
            } catch (error) {
                console.error("Erro ao adicionar tarefa:", error);
            }
        }

        Modal.setAppElement('#__next');

        return (
            <>
                <Head>
                    <title>Painel - Tasks</title>
                </Head>
                <div>
                    <Header />
                    <main className="max-w-[720px] m-16 mx-auto px-8 flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex">
                                <h1 className="text-white text-xl md:text-3xl mr-4">Todas as tarefas</h1>
                                 <button onClick={() => handleFinishItem()}>
                                <FiRefreshCcw 
                                    color="#3fffa3"
                                    size={25}
                                />
                            </button>
                            </div>
                            
                            <button className="w-full md:w-36 mt-4 md:mt-0" onClick={() => setIsNewTaskModalOpen(true)}>
                                <p className="font-semibold text-base border px-2 py-1 text-white border-white hover:bg-gray-100 transition duration-700 rounded-md">Nova tarefa</p>
                            </button>
                        </div>
                        <article className="flex flex-col my-4">
                            {tasks.length === 0 && (
                                <span className="text-gray-100 text-xl">
                                    Nenhuma tarefa foi encontrada...
                                </span>
                            )}
                            {tasks.map((task, index) => (
                            <section
                                key={task.id}
                                className={`flex bg-dark-900 mb-4 items-stretch rounded-md w-full animate__animated animate__backInLeft`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                    <div className="text-xl text-white items-left flex flex-col p-4 w-full">
                                        <div className="flex justify-between items-center w-[98%] mb-4">
                                            <h1 className="font-bold text-base md:text-xl">{task.title}</h1>
                                            <div className="flex space-x-4">
                                                <button onClick={() => handleEditTask()}>
                                                    <MdEdit color="#FFF" size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteTask(task.id)}>
                                                    <MdDeleteOutline color="#FF5757" size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-base text-gray-200 bg-slate-700 p-2 rounded">{task.description}</p>
                                    </div>
                                </section>
                            ))}
                        </article>
                    </main>
                    <ModalNewTask 
                        isOpen={isNewTaskModalOpen} 
                        onRequestClose={() => setIsNewTaskModalOpen(false)} 
                        handleAddTask={handleAddTask} 
                    />
                </div>
            </>
        );
    }

export const getServerSideProps = canSSRAuth( async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/tasks')
    
    return {
        props: {
            initialTasks: response.data
        }
    }
})