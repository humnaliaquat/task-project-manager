import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Project Details - {id}</h1>
      <p className="mt-2 text-gray-700">
        Here you can show project details, tasks, etc.
      </p>
    </div>
  );
}
