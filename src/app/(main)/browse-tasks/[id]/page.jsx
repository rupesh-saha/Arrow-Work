import TaskDetailsClient from "@/components/TaskDetailsClient";

const TaskDetailsPage = async ({params}) => {
  const {id} = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/tasks/${id}`, {
    cache: "no-store",
  });

  const task = response.ok ? await response.json() : null;

  return (
    <div>
      <TaskDetailsClient task={task}/>
    </div>
  );
};

export default TaskDetailsPage;