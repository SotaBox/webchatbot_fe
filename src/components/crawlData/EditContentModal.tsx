import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
interface IProps {
  modalEdit: {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
  };
}
export default function EditContentModal({ modalEdit }: IProps) {
  return (
    <Modal isOpen={modalEdit.isOpen} onOpenChange={modalEdit.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete SiteMap
            </ModalHeader>
            <ModalBody>
              Are you sure delete url `https://laodong.vn/` ?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={modalEdit.onClose}>
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
