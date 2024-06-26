import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
interface IProps {
  modalDelete: {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
  };
}
export default function DeleteUrlModal({ modalDelete }: IProps) {
  return (
    <Modal isOpen={modalDelete.isOpen} onOpenChange={modalDelete.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete URL
            </ModalHeader>
            <ModalBody>
              Are you sure delete url `https://laodong.vn/` ? modal 2
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
