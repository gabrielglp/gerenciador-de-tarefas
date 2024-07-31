import Modal from "react-modal";
import { FiX } from "react-icons/fi";

interface ModalDeleteTaskProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirmDelete: () => void;
}

export function ModalDeleteTask({ isOpen, onRequestClose, onConfirmDelete }: ModalDeleteTaskProps) {

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

      <div className="text-center text-white">
        <h2 className="my-4">Tem certeza que deseja excluir está tarefa?</h2>
        <div className="flex justify-center space-x-4">
          <button 
            className="border border-red-900 py-2 px-4 rounded text-white bg-red-500"
            onClick={onConfirmDelete}
          >
            Excluir
          </button>
          <button 
            className="border border-gray-900 py-2 px-4 rounded text-white bg-gray-500"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}