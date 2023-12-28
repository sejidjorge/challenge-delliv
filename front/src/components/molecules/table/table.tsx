import { CardTable } from "@/components/atoms/cards";
import Typography from "@/components/atoms/typography";
import { formatDate } from "@/utils/formatDate";
import { getLabelStatus } from "@/utils/labels";
import { useEffect, useState } from "react";
import IconButton from "../IconBtn";
import ModalDeleteOrder from "../modalDeleteOrder";
import ModalEditOrder from "../modalEditOrder";
import {
  ContainerTablePagination,
  TableHead,
  TableHeadTh,
  TableStyled,
  TableTd,
} from "./table.styles";

interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: string;
  name: string;
  address: string;
}

interface TableDataProps {
  columns: string[];
  data: any;
  refresh: () => void;
}

export default function Table({ data, columns, refresh }: TableDataProps) {
  const [changeStatusOrder, setChangeStatusOrder] = useState(false);
  const [modalDeleteOrder, setModalDeleteOrder] = useState(false);
  const [order, setOrder] = useState<Order>();
  const [orderDelete, setOrderDelete] = useState<Order>();

  function handleEditStatus(data: Order) {
    setOrder(data);
    setChangeStatusOrder(true);
  }

  function handleDelete(data: Order) {
    setOrderDelete(data);
    setModalDeleteOrder(true);
  }

  useEffect(() => {
    if (!changeStatusOrder && order) {
      setOrder(undefined);
      refresh();
    }
    if (!modalDeleteOrder && orderDelete) {
      setOrderDelete(undefined);
      refresh();
    }
  }, [changeStatusOrder, modalDeleteOrder]);

  return (
    <CardTable>
      <TableStyled>
        <TableHead>
          <tr>
            {columns.map((item, index) => (
              <TableHeadTh key={index}>
                <Typography.Body>{item}</Typography.Body>
              </TableHeadTh>
            ))}
          </tr>
        </TableHead>
        <tbody>
          {data.map((rowData, index) => (
            <tr key={index}>
              <TableTd>
                <IconButton
                  variant="text"
                  icon="edit"
                  click={() => {
                    if (rowData?.status) {
                      handleEditStatus(rowData as Order);
                    }
                  }}
                />
                <IconButton
                  variant="text"
                  icon="delete"
                  click={() => {
                    if (rowData?.status) {
                      handleDelete(rowData as Order);
                    }
                  }}
                />
              </TableTd>
              {Object.entries(rowData).map(([key, value]) => (
                <TableTd key={key}>
                  <Typography.Label>
                    {key === "createdAt" || key === "updatedAt"
                      ? formatDate(new Date(value))
                      : key === "status"
                      ? getLabelStatus(value)
                      : value}
                  </Typography.Label>
                </TableTd>
              ))}
            </tr>
          ))}
        </tbody>
      </TableStyled>
      <ContainerTablePagination>
        <Typography.Label>total de registros {data.length}</Typography.Label>
      </ContainerTablePagination>
      {order && (
        <ModalEditOrder
          open={changeStatusOrder}
          setOpen={setChangeStatusOrder}
          order={order}
        />
      )}
      {orderDelete && (
        <ModalDeleteOrder
          open={modalDeleteOrder}
          setOpen={setModalDeleteOrder}
          order={orderDelete}
        />
      )}
    </CardTable>
  );
}
