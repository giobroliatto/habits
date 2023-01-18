interface HabitProps {
  completed: number;
}

export function Habit(props: HabitProps) {
  return (
    <div className="bg-violet-700 w-10 h-10 text-white rounded m2 flex items-center justify-center"> {props.completed} </div>
  )
}