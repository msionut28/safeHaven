import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function SearchBar({props}) {
  return (
    <>
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder={props.placeholder} />
      <Button type="submit">{props.buttonText}</Button>
    </div>
    </>
  )
}
