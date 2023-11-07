import { useParams } from "solid-start";

export default function BlogPage() {
  const params = useParams();
  return <div>Blog {params.post}</div>;
}
