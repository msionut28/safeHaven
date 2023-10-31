// CheckBox.js (Child Component)
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckBox({ id, description, checked, onChange }) {
  return (
    <>
      <Checkbox 
        id={id}
        checked={checked}
        onCheckedChange={() => onChange(id)}
      />
      <label 
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {description}
      </label>
    </> 
  );
}
