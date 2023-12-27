import { CardDataBody } from "@/components/atoms/cards";
import Typography from "@/components/atoms/typography";
import { getLabelStatus } from "@/utils/labels";

export default function CardData({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <CardDataBody>
      <Typography.Body>{getLabelStatus(title)}</Typography.Body>
      <Typography.Display>{count}</Typography.Display>
    </CardDataBody>
  );
}
