import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

const LocationSelector = ({ value, onChange }) => {
  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        name="location"
        value={value}
        onChange={onChange}
        placeholder="Enter your location"
        className="pl-10"
      />
    </div>
  )
}

export default LocationSelector

