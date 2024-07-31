import Modal from "react-modal";

import { toast } from "react-toastify";

import { FiX } from "react-icons/fi";
import { useState } from "react";

interface ModalNewTaskProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleAddTask: (title: string, description: string) => void;
}

export function ModalNewTask({ isOpen, onRequestClose, handleAddTask }: ModalNewTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '30px',
      backgroundColor: '#1d1d2e'
    }
  }

  const handleSubmit = () => {

    if(title === '' || description === '') {
      toast.warning('Preencha todos os campos');
      return;
    }

    handleAddTask(title, description);
    setTitle("");
    setDescription("");
    onRequestClose();

    toast.success('Tarefa adicionada.');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color="#f34748"/>
      </button>

      <div className="w-72 mm:w-80 sm:w-96 md:w-[620px] bg-dark-700 text-white">
        <h2 className="my-4">Nova Tarefa</h2>
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Título" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <textarea 
            placeholder="Descrição" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <button className="border border-green-900 py-2 px-4 rounded text-white" onClick={handleSubmit}>
          Adicionar Tarefa
        </button>
      </div>
    </Modal>
  );
}