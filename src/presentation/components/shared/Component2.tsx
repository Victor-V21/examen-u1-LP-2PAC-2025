import { useCountStore } from "../../stores/countStore"

export const Component2 = () => {

    const {count} = useCountStore();
  return (
    <div className="p-4">C2: {count}</div>
  )
}