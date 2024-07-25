const { Space, Tooltip, Button } = require("antd");
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbPencilMinus } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";

export const Actions = ({ record }) => {
  const notDisabled =
    record.oc_status === "Rechazada" || record.oc_status === "Borrador";

  return (
    <Space size="small">
      <Tooltip title="Ver OC">
        <Button
          type="text"
          icon={<IoDocumentTextOutline size={20} color="#0D6EFD" />}
        />
      </Tooltip>
      <Tooltip title={notDisabled ? "Editar OC" : ""}>
        <Button
          type="text"
          icon={
            <TbPencilMinus
              size={20}
              color={notDisabled ? "#0D6EFD" : "#A0AEC0"}
            />
          }
          disabled={!notDisabled}
        />
      </Tooltip>
      <Tooltip title={notDisabled ? "Eliminar OC" : ""}>
        <Button
          type="text"
          icon={
            <AiOutlineDelete
              size={20}
              color={notDisabled ? "#E53535" : "#FCBABA"}
            />
          }
          disabled={!notDisabled}
        />
      </Tooltip>
    </Space>
  );
};
