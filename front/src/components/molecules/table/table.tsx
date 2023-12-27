import Typography from "@/components/atoms/typography";
import {
  ContainerTablePagination,
  TableHead,
  TableHeadTh,
  TableStyled,
  TableTd,
} from "./table.styles";
import { formatDate } from "@/utils/formatDate";
import { CardTable } from "@/components/atoms/cards";
import { getLabelStatus } from "@/utils/labels";

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
  data: User[] | Order[];
}

export default function Table({ data, columns }: TableDataProps) {
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
                <Typography.Label></Typography.Label>
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
    </CardTable>
  );
}
