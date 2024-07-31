import { useState } from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";

import Head from "next/head";
import { Header } from "../../components/Header";

import { MdDeleteOutline } from "react-icons/md";
import { FiRefreshCcw } from 'react-icons/fi';

import Modal from 'react-modal';

import { setupAPIClient } from "../../services/api";
import { ModalNewTask } from "../../components/Modal/ModalNewTask";
import { ModalDeleteTask } from "../../components/Modal/ModalDeleteTask";

import { useAuth } from '../../contexts/AuthContext';

import 'animate.css';
import { toast } from "react-toastify";

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
        const { user } = useAuth();

        const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);
        const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

        const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
        const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

        async function handleFinishItem() {
            const apiClient = setupAPIClient();
            
            try {
                const response = await apiClient.get('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        }

        async function handleDeleteTask() {
            const apiClient = setupAPIClient();
            
            try {
                if (taskToDelete) {
                    await apiClient.delete(`/tasks/${taskToDelete}`);
                    setTasks(tasks.filter(task => task.id !== taskToDelete));
                    setTaskToDelete(null);
                    setIsDeleteTaskModalOpen(false);
                    toast.success('Tarefa Deletada.');
                }
            } catch (error) {
                console.error("Erro ao deletar tarefa:", error);
            }
        }

        function openDeleteTaskModal(id: string) {
            setTaskToDelete(id);
            setIsDeleteTaskModalOpen(true);
        }

        async function handleAddTask(title: string, description: string) {
            const apiClient = setupAPIClient();
            try {
                if (user) {
                    const response = await apiClient.post('/tasks', { title, description, userId: user.id });
                    setTasks([...tasks, response.data]);
                } else {
                    toast.error('Usuário não autenticado.');
                }
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
                    <main className="max-w-custom-720 m-16 mx-auto px-8 flex flex-col">
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
                                                <button onClick={() => openDeleteTaskModal(task.id)}>
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
                    <ModalDeleteTask
                        isOpen={isDeleteTaskModalOpen}
                        onRequestClose={() => setIsDeleteTaskModalOpen(false)}
                        onConfirmDelete={handleDeleteTask}
                    />
                </div>
            </>
        );
    }

    export const getServerSideProps = canSSRAuth(async (ctx) => {
        const apiClient = setupAPIClient(ctx);
    
        try {
            const response = await apiClient.get('/tasks');
            return {
                props: {
                    initialTasks: response.data
                }
            };
        } catch (error) {
            // Redireciona para a página de login se não estiver autenticado
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            };
        }
    });