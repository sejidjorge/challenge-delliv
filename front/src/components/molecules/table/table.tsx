import { CardTable } from "@/components/atoms/cards";
import Typography from "@/components/atoms/typography";
import { formatDate } from "@/utils/formatDate";
import { getLabelStatus } from "@/utils/labels";
import { useEffect, useState } from "react";
import IconButton from "../IconBtn";
import ModalDeleteOrder from "../modalDeleteOrder";
import ModalDeleteUser from "../modalDeleteUser";
import ModalEditOrder from "../modalEditOrder";
import {
  ContainerTablePagination,
  TableHead,
  TableHeadTh,
  TableStyled,
  TableTd,
} from "./table.styles";
import EditUserSidebar from "../EditUseridebar";

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
  const [profile, setProfile] = useState<User>();
  const [editUser, setEditUser] = useState(false);
  const [orderDelete, setOrderDelete] = useState<Order>();
  const [userDelete, setUserDelete] = useState<User>();
  const [modalDeleteUser, setModalDeleteUser] = useState(false);

  function handleEditStatus(data: Order) {
    setOrder(data);
    setChangeStatusOrder(true);
  }

  function handleEditProfile(data: User) {
    setProfile(data);
    setEditUser(true);
  }

  function handleDeleteOrder(data: Order) {
    setOrderDelete(data);
    setModalDeleteOrder(true);
  }

  function handleDeleteUser(data: User) {
    setUserDelete(data);
    setModalDeleteUser(true);
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
    if (!editUser && profile) {
      setProfile(undefined);
      refresh();
    }
    if (!modalDeleteUser && userDelete) {
      setUserDelete(undefined);
      refresh();
    }
  }, [changeStatusOrder, modalDeleteOrder, modalDeleteUser, editUser]);

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
                    } else {
                      handleEditProfile(rowData as User);
                    }
                  }}
                />
                <IconButton
                  variant="text"
                  icon="delete"
                  click={() => {
                    if (rowData?.status) {
                      handleDeleteOrder(rowData as Order);
                    } else {
                      handleDeleteUser(rowData as User);
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
      {userDelete && (
        <ModalDeleteUser
          open={modalDeleteUser}
          setOpen={setModalDeleteUser}
          user={userDelete}
        />
      )}
      {profile && (
        <EditUserSidebar open={editUser} setOpen={setEditUser} user={profile} />
      )}
    </CardTable>
  );
}
