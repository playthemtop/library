import ModalRoot from './modalRoot';
import ModalForm from './modalForm';
import ModalGame from './modalGame';
import ModalWidget from './modalWidget';
import ModalWin from './modalWin';

const modalRootElems = (data) => {
  const dataRoot = ModalRoot(data);
  const dataForm = ModalForm(data);
  const dataGame = ModalGame(data);
  const dataWidget = ModalWidget(data);
  const dataWin = ModalWin(data);

  return {
    ...dataRoot, ...dataForm, ...dataGame, ...dataWidget, ...dataWin,
  };
}

export default modalRootElems;
