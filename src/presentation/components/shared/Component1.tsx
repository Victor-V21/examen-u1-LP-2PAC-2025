import { useCountStore } from "../../stores/countStore"

export const Component1 = () => {

    const {count} = useCountStore();
  return (
    <div className="p-4">C1: {count}</div>
  )
}