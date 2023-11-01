import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar({props}) {
  const [inputValue, setInputValue] = useState('')
  function handleInputChange(e) {
    const newSearchTerm = e.target.value
    setInputValue(newSearchTerm)
    props.onSearch(newSearchTerm)
  }
  return (
    <>
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input 
      type="text" 
      placeholder={props.placeholder} 
      value={inputValue}
      onChange={handleInputChange} />
      <Button 
      type="submit"
      onClick={props.onClick}
      >{props.buttonText}</Button>
    </div>
    </>
  )
}
