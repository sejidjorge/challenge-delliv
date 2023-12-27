import Typography from "@/components/atoms/typography";
import { TableHead, TableHeadTh, TableStyled, TableTd } from "./table.styles";
import { formatDate } from "@/utils/formatDate";

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
  user: {
    name: string;
    address: string;
    email: string;
  };
}

interface TableDataProps {
  columns: string[];
  data: User[] | Order[];
}

export default function Table({ data, columns }: TableDataProps) {
  return (
    <div>
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
              {Object.entries(rowData).map(([key, value]) => (
                <TableTd key={key}>
                  <Typography.Label>
                    {key === "createdAt" || key === "updatedAt"
                      ? formatDate(new Date(value))
                      : value}
                  </Typography.Label>
                </TableTd>
              ))}
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </div>
  );
}
